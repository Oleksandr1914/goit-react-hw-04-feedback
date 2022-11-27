import { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Notification from './Notification';
import '../index.css';

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const percentageOfReviews = total => {
    const calc = ((good + neutral) / total) * 100;
    return Math.floor(calc);
  };

  const onLeaveFeedback = e => {
    switch (e.target.name) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        return;
    }
  };

  const total = good + neutral + bad;
  const positivePercentage = percentageOfReviews(total);
  return (
    <div className="container">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={{
            good,
            neutral,
            bad,
          }}
          onLeaveFeedback={onLeaveFeedback}
        />
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
};

export default Feedback;
