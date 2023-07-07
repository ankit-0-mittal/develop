import Steps from 'app/components/atoms/Steps';
const { Step } = Steps;

export function FormStepper({ percent = 0, current = 0, stepper = {} }) {
  return (
    <Steps current={current} percent={percent} style={{ display: 'block' }}>
      {stepper.map(
        step =>
          step.show && (
            <Step title={step.title} description={step.description} />
          ),
      )}
    </Steps>
  );
}
