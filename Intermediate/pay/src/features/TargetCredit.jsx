import React from "react";
import { Input } from "../components/Input";
import { StepVariant } from "../constants/StepValriants";

export const TargetCredit = ({ registerInput, onNextStep }) => {
  return (
    <section>
      <form className="app-form">
        <div className="form-group">
          <Input data-testid="src-card" label="کارت مبدا" {...registerInput("sourceCredit")} />
        </div>
        <div className="form-group">
          <Input data-testid="target-card" label="کارت مقصد" {...registerInput("targetCredit")} />
        </div>
        <div className="form-group">
          <Input data-testid="price" label="مبلغ نتقال ( ریال )" {...registerInput("price")} />
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="form-group">
          <button
            data-testid="target-next-button"
            onClick={onNextStep}
            className="app-button"
          >
            تایید و ادامه
          </button>
        </div>
      </form>
    </section>
  );
};
