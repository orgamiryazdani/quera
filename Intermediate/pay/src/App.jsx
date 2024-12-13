import { TransportLayout } from "./layouts/TransportLayout";
import { useEffect, useState } from "react";
import { StepVariant } from "./constants/StepValriants";
import { TargetCredit } from "./features/TargetCredit";
import { SourceCredit } from "./features/SourceCredit";
import { ReportTransport } from "./features/ReportTransport";

const steps = [TargetCredit, SourceCredit, ReportTransport];

function App() {
  const [stepsForm, setStepsForm] = useState([
    { sourceCredit: "", targetCredit: "", price: "" },
    { cvv2: "", month: "", year: "", dynamicPassword: "", timer: null },
    {},
  ]);
  const [step, setStep] = useState(0);

  const onNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1)
  };

  const onPrevStep = () => {
    setStep(step - 1)
  };

  const getStepValue = (step) => {
    return stepsForm[step]
  };

  useEffect(() => {
    if (stepsForm[1].timer > 0) {
      const interval = setInterval(() => {
        setStepsForm((prev) =>
          prev.map((form, idx) =>
            idx === 1 ? { ...form, timer: form.timer - 1 } : form
          )
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [stepsForm[1].timer]);

  const handleStepValue = (step, name, value) => {
    setStepsForm((prev) =>
      prev.map((form, idx) =>
        idx === step ? { ...form, [name]: value } : form
      )
    );
  };

  const registerInput = (name) => ({
    name,
    onChange: (e) => handleStepValue(step, name, e.target.value),
    value: stepsForm[step][name] || "",
  });

  const CurrentStep = steps[step];

  return (
    <TransportLayout>
      <CurrentStep
        registerInput={registerInput}
        handleValue={(name, value) => handleStepValue(step, name, value)}
        getStepValue={getStepValue}
        onNextStep={onNextStep}
        onPrevStep={onPrevStep}
      />
    </TransportLayout>
  );
}

export default App;