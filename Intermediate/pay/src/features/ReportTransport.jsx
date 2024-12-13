import React from "react";
import { StepVariant } from "../constants/StepValriants";
import { FactorRow } from "../components/FactorRow";

export const ReportTransport = ({ getStepValue }) => {
  const target = getStepValue(StepVariant.Target);
  return (
    <div>
      <FactorRow testid="src-card-report" title="شماره کارت مبدا">{target.sourceCredit}</FactorRow>
      <FactorRow testid="target-card-report" title="شماره کارت مقصد">{target.targetCredit}</FactorRow>
      <FactorRow testid="price-report" title="مبلغ انتقال">{target.price} ریال</FactorRow>
    </div>
  );
};
