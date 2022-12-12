import Head from 'next/head';
import React, { useState } from 'react';
import { BtuCalculator, ResultContent } from '../styles/Home';

type ResultProps = {
  morningSunWatts?: number;
  allDaySunWatts?: number;
  morningSunBtu?: number;
  allDaySunBtu?: number;
};

type FormDataProps = {
  meter: number;
  people: number;
  window: number;
  appliance: number;
};

type DataWattsProps = {
  morningSunWatts?: number;
  allDaySunWatts?: number;
  peopleWatts?: number;
  windowWatts?: number;
  applianceWatts?: number;
};

const initialFormData = {
  meter: 10,
  people: 1,
  window: 1,
  appliance: 1,
};

const btuCalculatorData = {
  wattsReferenceNumber: 0.2929,
  morningSunReference: 600,
  allDaySunReference: 800,
  peopleWatts: 174.45,
  windowWatts: 581.5,
  applianceWatts: 1.00018,
  btuByReference: [
    { reference: 11000, value: 9000 },
    { reference: 14000, value: 12000 },
    { reference: 20000, value: 18000 },
    { reference: 26000, value: 24000 },
    { reference: 32000, value: 30000 },
    { reference: 50000, value: 30000 },
  ],
};

function getMorningSunWatts(meter: number) {
  let btu = meter * btuCalculatorData.morningSunReference;

  return btu * btuCalculatorData.wattsReferenceNumber;
}

function getAllDaySunWatts(meter: number) {
  let btu = meter * btuCalculatorData.allDaySunReference;

  return btu * btuCalculatorData.wattsReferenceNumber;
}

function getPeopleWatts(quantity: number) {
  return btuCalculatorData.peopleWatts * quantity;
}

function getWindowWatts(quantity: number) {
  return btuCalculatorData.windowWatts * quantity;
}

function getApplianceWatts(quantity: number) {
  return btuCalculatorData.applianceWatts * quantity;
}

function sumWatts(data: DataWattsProps, allDay: boolean) {
  let dataWatts = Object.assign({}, data);

  if (allDay) {
    delete dataWatts.morningSunWatts;
  } else {
    delete dataWatts.allDaySunWatts;
  }

  const watts = Object.values(dataWatts);

  return watts.reduce((accumulator, watt) => accumulator + watt, 0);
}

function btuCalcFormat(value: number) {
  return Number((value / btuCalculatorData.wattsReferenceNumber).toFixed(0));
}

function getBtuByReference(referenceNumber: number) {
  const btuReference = btuCalculatorData.btuByReference.filter(
    (btu) => referenceNumber <= btu.reference
  );

  console.log(referenceNumber);

  return btuReference[0].value;
}

export default function Home() {
  const [result, setResult] = useState<ResultProps>({});
  const [formData, setFormData] = useState<FormDataProps>(initialFormData);

  function handleCalculateResult(e: React.FormEvent) {
    e.preventDefault();
    const { meter, people, window, appliance } = formData;

    const dataWatts = {
      morningSunWatts: getMorningSunWatts(meter),
      allDaySunWatts: getAllDaySunWatts(meter),
      peopleWatts: getPeopleWatts(people),
      windowWatts: getWindowWatts(window),
      applianceWatts: getApplianceWatts(appliance),
    };

    result.morningSunWatts = sumWatts(dataWatts, false);
    result.allDaySunWatts = sumWatts(dataWatts, true);

    result.morningSunBtu = getBtuByReference(
      btuCalcFormat(result.morningSunWatts)
    );
    result.allDaySunBtu = getBtuByReference(
      btuCalcFormat(result.allDaySunWatts)
    );

    setResult({ ...result });
  }

  function handleUpdateFormData(
    prop: 'meter' | 'people' | 'window' | 'appliance',
    value: number
  ) {
    formData[prop] = value;

    setFormData(formData);
  }

  return (
    <div className='container'>
      <Head>
        <title>Btu Calculator</title>
      </Head>

      <main>
        <BtuCalculator>
          <div className='content'>
            <form id='form-btu' onChange={handleCalculateResult}>
              <div>
                <label htmlFor='meter'>Quantos m2 o ambiente possui?</label>
                <select
                  name='meter'
                  onChange={(e) => {
                    handleUpdateFormData('meter', parseInt(e.target.value));
                  }}
                >
                  <option value='10'>10</option>
                  <option value='12'>12</option>
                  <option value='15'>15</option>
                  <option value='20'>20</option>
                  <option value='25'>25</option>
                </select>
              </div>
              <div>
                <label htmlFor='people'>Quantas pessoas ocupam o local?</label>
                <select
                  name='people'
                  onChange={(e) => {
                    handleUpdateFormData('people', parseInt(e.target.value));
                  }}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </div>
              <div>
                <label htmlFor='window'>
                  Quantas janelas o ambiente possui?
                </label>
                <select
                  name='window'
                  onChange={(e) => {
                    handleUpdateFormData('window', parseInt(e.target.value));
                  }}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                </select>
              </div>
              <div>
                <label htmlFor='appliance'>
                  Quantos eletrodomésticos em funcionamento?
                </label>
                <select
                  name='appliance'
                  onChange={(e) => {
                    handleUpdateFormData('appliance', parseInt(e.target.value));
                  }}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='15'>10+</option>
                </select>
              </div>
            </form>
          </div>

          <ResultContent>
            <h2>Resultado:</h2>
            {Object.keys(result).length !== 0 ? (
              <div className='result'>
                <div className='item'>
                  <span className='title'>W/h:</span>
                  <p>
                    sol da manhã: <strong>{result.morningSunWatts}</strong>
                  </p>
                  <p>
                    sol dia todo: <strong>{result.allDaySunWatts}</strong>
                  </p>
                </div>
                <div className='item'>
                  <span className='title'>btus:</span>
                  <p>
                    sol da manhã: <strong>{result.morningSunBtu}</strong>
                  </p>
                  <p>
                    sol dia todo: <strong>{result.allDaySunBtu}</strong>
                  </p>
                </div>
              </div>
            ) : (
              '---'
            )}
          </ResultContent>
        </BtuCalculator>
      </main>
    </div>
  );
}
