import React from "react";
import { Input } from "../components/Input";
import { BackButton } from "../components/BackButton";
import { StepVariant } from "../constants/StepValriants";

export const SourceCredit = ({
  handleValue,
  getStepValue,
  registerInput,
  step,
  onNextStep,
  onPrevStep,
}) => {
  const values = getStepValue(StepVariant.Source);
  return (
    <section>
      <div className="app-form">
        <div className="form-group">
          <Input label="Cvv2" {...registerInput("cvv2")} />
        </div>
        <div className="form-group">
          <div className="group-2">
            <div>
              <Input label="ماه" {...registerInput("month")} />
            </div>
            <div>
              <Input label="سال" {...registerInput("year")} />
            </div>
          </div>
        </div>
        <div className="form-group">
          <Input
            type="password"
            label="رمز پیامکی"
            {...registerInput("dynamicPassword")}
          />
        </div>
        <div className="form-group">
          <div className="group-2">
            <div>
              {values.timer !== null ? (
                <span data-testid="timer">{values.timer} ثانیه باقی مانده</span>
              ) : null}
            </div>
            <div>
              <button
                data-testid="timer-button"
                onClick={() => handleValue("timer", 120)}
                className="app-button re-send"
              >
                رمز پیامکی جدید
              </button>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}> </div>
        <div className="form-group">
          <BackButton data-testid="credit-back-button" onClick={onPrevStep} />
          <button
            data-testid="credit-next-button"
            onClick={onNextStep}
            className="app-button"
          >
            پرداخت وجه
          </button>
        </div>
      </div>
    </section>
  );
};
