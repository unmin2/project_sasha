import React, { useState } from 'react';

const BrakeSystemTest = () => {
  const [data, setData] = useState({
    PTA1: { brakeForceLeft: '', brakeForceRight: '', differencePercent: '', ovalityLeft: '', ovalityRight: '', UTS: '' },
    PTA2: { brakeForceLeft: '', brakeForceRight: '', differencePercent: '', ovalityLeft: '', ovalityRight: '', UTS: '' },
    CTA2: { brakeForceLeft: '', brakeForceRight: '', differencePercent: '', ovalityLeft: '', ovalityRight: '', UTS: '' },
    // Add other tests and their parameters
  });

  const handleInputChange = (testName, property, value) => {
    setData((prevData) => ({
      ...prevData,
      [testName]: {
        ...prevData[testName],
        [property]: value, // Save the input as text
      },
    }));
  };

  // Function to format the input values (remove trailing zeros)
  const formatInputValue = (value) => {
    const floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
      return floatValue.toString(); // Convert to string to remove trailing zeros
    }
    return '';
  };

  // Calculate results for "ОКР РТА" and "ОКР СТА" separately
  const calculateResultsOKRRTA = () => {
    const totalBrakeForceOKRRTA = Object.keys(data).reduce((total, testName) => {
      if (testName.startsWith('PTA')) {
        const leftValue = parseFloat(data[testName].brakeForceLeft);
        const rightValue = parseFloat(data[testName].brakeForceRight);
        return total + (isNaN(leftValue) ? 0 : leftValue) + (isNaN(rightValue) ? 0 : rightValue);
      }
      return total;
    }, 0);

    return totalBrakeForceOKRRTA.toFixed(2); // Format to 2 decimal places
  };

  const calculateResultsOKRCSTA = () => {
    const totalBrakeForceOKRCSTA = Object.keys(data).reduce((total, testName) => {
      if (testName.startsWith('CTA')) {
        const leftValue = parseFloat(data[testName].brakeForceLeft);
        const rightValue = parseFloat(data[testName].brakeForceRight);
        return total + (isNaN(leftValue) ? 0 : leftValue) + (isNaN(rightValue) ? 0 : rightValue);
      }
      return total;
    }, 0);

    return totalBrakeForceOKRCSTA.toFixed(2); // Format to 2 decimal places
  };

  // Helper function to determine Предели based on Разность and УТС values
  const determinePredeli = (differencePercent, UTS) => {
    if (differencePercent > 50 || UTS < 16) {
      return 'УТС слаба';
    } else if (differencePercent > 25 || UTS < 45) {
      return 'УТС велика';
    } else {
      return '';
    }
  };

  return (
    <div className="brake-system-test">
      <h2>Тест тормозной системи</h2>
      <table>
        <thead>
          <tr>
            <th>Тест</th>
            <th>Тест тормозов</th>
            <th>Тормозная сила (слева) [кН]</th>
            <th>Тормозная сила (справа) [кН]</th>
            <th>Разность [%]</th>
            <th>Овальность (слева) [%]</th>
            <th>Овальность (справа) [%]</th>
            <th>УТС [%]</th>
            <th>Предели</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((testName) => (
            <tr key={testName}>
              <td>{testName}</td>
              <td>
                <input
                  type="number"
                  step="0.01" // Allow decimal numbers
                  value={formatInputValue(data[testName].brakeForceLeft)} // Format input value
                  onChange={(e) => handleInputChange(testName, 'brakeForceLeft', e.target.value)}
                  style={{ width: '70px' }} // Set the width
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01" // Allow decimal numbers
                  value={formatInputValue(data[testName].brakeForceRight)} // Format input value
                  onChange={(e) => handleInputChange(testName, 'brakeForceRight', e.target.value)}
                  style={{ width: '70px' }} // Set the width
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01" // Allow decimal numbers
                  value={formatInputValue(data[testName].differencePercent)} // Format input value
                  onChange={(e) => handleInputChange(testName, 'differencePercent', e.target.value)}
                  style={{ width: '70px' }} // Set the width
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01" // Allow decimal numbers
                  value={formatInputValue(data[testName].ovalityLeft)} // Format input value
                  onChange={(e) => handleInputChange(testName, 'ovalityLeft', e.target.value)}
                  style={{ width: '70px' }} // Set the width
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01" // Allow decimal numbers
                  value={formatInputValue(data[testName].ovalityRight)} // Format input value
                  onChange={(e) => handleInputChange(testName, 'ovalityRight', e.target.value)}
                  style={{ width: '70px' }} // Set the width
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01" // Allow decimal numbers
                  value={formatInputValue(data[testName].UTS)} // Format input value
                  onChange={(e) => handleInputChange(testName, 'UTS', e.target.value)}
                  style={{ width: '70px' }} // Set the width
                />
              </td>
              <td>{determinePredeli(data[testName].differencePercent, data[testName].UTS)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Результати</h3>
        <p>ОКР РТА: Тормоз {calculateResultsOKRRTA()} [кН]</p>
        <p>ОКР СТА: Тормоз {calculateResultsOKRCSTA()} [кН]</p>
        {/* Add other results for display */}
      </div>
    </div>
  );
};

export default BrakeSystemTest;
