import Notiflix from 'notiflix';

const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const btn = document.querySelector('button');


function createPromise(position, delayValue) {
  return new Promise((resolve, reject) => {
     setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delayValue });
  } else {
    reject({ position, delayValue });

  }
}, delayValue);
  });
}

const createMultiplePromises = e => {
  e.preventDefault();

  let delayValue = delay.valueAsNumber;
  let stepValue = step.valueAsNumber;
  let amountValue = amount.valueAsNumber;

  for (let position = 1; position <= amountValue; position++) {
    createPromise(position, delayValue)
    .then(({ position, delayValue }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
    })
    .catch(({ position, delayValue }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`);
    });
    delayValue += stepValue;
    ;
  }
};

btn.addEventListener("click", createMultiplePromises);