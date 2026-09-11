"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import {
  QuizCheck,
  QuizInput,
  QuizPills,
  formatPhone,
  phoneDigits,
} from "@/src/components/ui/QuizField";
import { Reveal, motionEase } from "@/src/components/ui/Reveal";

type Answers = {
  level: string;
  format: string;
  place: string;
  name: string;
  phone: string;
  channel: string;
  consent: boolean;
  campId: string;
};

const empty: Answers = {
  level: "",
  format: "",
  place: "",
  name: "",
  phone: "",
  channel: "",
  consent: false,
  campId: "",
};

export function Signup() {
  const quiz = site.quiz;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(empty);
  const [errors, setErrors] = useState<{ phone?: string; consent?: string; submit?: string }>(
    {},
  );
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const reduceMotion = useReducedMotion();

  const placeOptions = useMemo(
    () => [
      ...site.courts.items.map((court) => ({
        id: court.id,
        label: court.name,
      })),
      quiz.steps[2].other,
    ],
    [quiz.steps],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const format = params.get("format");
    const court = params.get("court");
    const campId = params.get("campId");
    setAnswers((current) => ({
      ...current,
      format:
        format && quiz.steps[1].options.some((item) => item.id === format)
          ? format
          : current.format,
      place:
        court && site.courts.items.some((item) => item.id === court)
          ? court
          : current.place,
      campId: campId ?? current.campId,
    }));
  }, [quiz.steps]);

  const stepLabel = quiz.stepLabel.replace("{n}", String(step + 1));

  async function submit() {
    const phone = phoneDigits(answers.phone);
    const nextErrors: typeof errors = {};
    if (phone.length !== 10) nextErrors.phone = quiz.errors.phone;
    if (!answers.consent) nextErrors.consent = quiz.errors.consent;
    setErrors(nextErrors);
    if (nextErrors.phone || nextErrors.consent) return;

    setSending(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const payload = {
        source: "signup",
        court: answers.place,
        format: answers.format,
        campId: answers.campId,
        level: answers.level,
        name: answers.name,
        phone: `+7${phone}`,
        channel: answers.channel,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        yclid: params.get("yclid"),
      };
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("fail");
      setDone(true);
    } catch {
      setErrors({ submit: quiz.errors.submit });
    } finally {
      setSending(false);
    }
  }

  return (
    <Section id="signup" tone="ball">
      <Container>
        <Reveal>
          <SectionHeading
            title={quiz.title}
            lead={quiz.lead}
            tone="light"
            align="center"
            titleClassName="mx-auto max-w-[12ch] text-[clamp(1.45rem,6.2vw,3rem)] [text-wrap:wrap]"
          />
        </Reveal>
        <div className="mx-auto mt-12 w-full max-w-xl">
          <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="success"
              className="rounded-[28px] bg-line p-8 text-center text-ink md:p-12"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: motionEase }}
            >
              <h3 className="text-h3">
                {quiz.successTitle.replace("{name}", answers.name.trim() || "друг")}
              </h3>
              <p className="mx-auto mt-5 max-w-[40ch] text-body text-ink/75">
                {quiz.successBody}
              </p>
              <div className="mt-8 flex justify-center">
                <Button href={quiz.successTelegram.href} variant="ink">
                  {quiz.successTelegram.label}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              className="rounded-[28px] bg-line/80 p-6 text-ink md:p-10"
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: motionEase }}
            >
              <p className="text-small font-medium uppercase tracking-[0.04em]">
                {stepLabel}
              </p>
              <h3 className="mt-3 text-h3">
                {step === 0
                  ? quiz.steps[0].question
                  : step === 1
                    ? quiz.steps[1].question
                    : step === 2
                      ? quiz.steps[2].question
                      : quiz.steps[3].question}
              </h3>
              <div className="mt-6">
                {step === 0 ? (
                  <QuizPills
                    legend={quiz.steps[0].question}
                    items={quiz.steps[0].options}
                    value={answers.level}
                    onChange={(id) => {
                      setAnswers((current) => ({ ...current, level: id }));
                      setStep(1);
                    }}
                  />
                ) : null}
                {step === 1 ? (
                  <QuizPills
                    legend={quiz.steps[1].question}
                    items={quiz.steps[1].options}
                    value={answers.format}
                    onChange={(id) => {
                      setAnswers((current) => ({ ...current, format: id }));
                      setStep(2);
                    }}
                  />
                ) : null}
                {step === 2 ? (
                  <QuizPills
                    legend={quiz.steps[2].question}
                    items={placeOptions}
                    value={answers.place}
                    onChange={(id) => {
                      setAnswers((current) => ({ ...current, place: id }));
                      setStep(3);
                    }}
                  />
                ) : null}
                {step === 3 ? (
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      void submit();
                    }}
                  >
                    <QuizInput
                      label={quiz.steps[3].name}
                      value={answers.name}
                      onChange={(event) =>
                        setAnswers((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      autoComplete="name"
                      required
                    />
                    <QuizInput
                      label={quiz.steps[3].phone}
                      value={answers.phone}
                      onChange={(event) =>
                        setAnswers((current) => ({
                          ...current,
                          phone: formatPhone(event.target.value),
                        }))
                      }
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 (___) ___-__-__"
                      error={errors.phone}
                    />
                    <p className="text-[15px] font-medium text-ink/80">
                      {quiz.steps[3].channel}
                    </p>
                    <QuizPills
                      legend={quiz.steps[3].channel}
                      items={quiz.steps[3].channels}
                      value={answers.channel}
                      onChange={(id) =>
                        setAnswers((current) => ({ ...current, channel: id }))
                      }
                    />
                    <QuizCheck
                      checked={answers.consent}
                      onChange={(consent) =>
                        setAnswers((current) => ({ ...current, consent }))
                      }
                      error={errors.consent}
                    >
                      {quiz.steps[3].consent}:{" "}
                      <a
                        href={quiz.steps[3].privacy.href}
                        className="underline underline-offset-2"
                      >
                        {quiz.steps[3].privacy.label}
                      </a>
                      ,{" "}
                      <a
                        href={quiz.steps[3].consentDoc.href}
                        className="underline underline-offset-2"
                      >
                        {quiz.steps[3].consentDoc.label}
                      </a>
                      ,{" "}
                      <a
                        href={quiz.steps[3].offer.href}
                        className="underline underline-offset-2"
                      >
                        {quiz.steps[3].offer.label}
                      </a>
                    </QuizCheck>
                    {errors.submit ? (
                      <p className="text-small text-clay">{errors.submit}</p>
                    ) : null}
                    <Button
                      type="submit"
                      variant="ink"
                      className="mt-2 h-16 w-full"
                      disabled={!answers.consent || sending}
                    >
                      {quiz.steps[3].submit}
                    </Button>
                  </form>
                ) : null}
              </div>
              {step > 0 && !done ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => current - 1)}
                  className="mt-6 text-[15px] font-medium text-ink/60"
                >
                  Назад
                </button>
              ) : null}
            </motion.div>
          )}
          </AnimatePresence>
          {!done ? (
            <p className="mt-6 text-center text-small text-ink/70">{quiz.note}</p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
