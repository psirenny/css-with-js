// @flow

type Options = { space: boolean };

const defaultOpts = { space: false };

export default (charset: string[], opts?: Options = defaultOpts) => {
  if (charset.length === 0) return '';

  let charCodeStart = charset[0].charCodeAt(0);
  let charCodePrev;
  let charCodeNext;
  let isInRange = false;
  let result = '';
  let write;

  if (opts.space) {
    write = (val) => {
      if (result) result += `, ${val}`;
      else result = val;
    };
  } else {
    write = (val) => {
      if (result) result += `,${val}`;
      else result = val;
    };
  }

  const writePoint = (val) => (
    write(`u+${val.toString(16)}`)
  );

  const writeRange = (leftVal: number, rightVal: number) => {
    const rightStr = rightVal.toString(16);
    const leftStr = leftVal.toString(16).padStart(rightStr.length, '0');
    let wildcards = '';

    for (let i = rightStr.length - 1; i >= 0; i -= 1) {
      const rightChar = rightStr[i];
      const leftChar = leftStr[i];

      if (leftChar === '0' && rightChar === 'f') {
        wildcards += '?';
      } else if (leftChar === rightChar) {
        write(`u+${leftStr.substring(0, i)}${leftChar}${wildcards}`);
        return;
      } else {
        break;
      }
    }

    write(`u+${leftStr}-${rightStr}`);
  };

  for (let i = 1; i < charset.length; i += 1) {
    charCodePrev = charset[i - 1].charCodeAt(0);
    charCodeNext = charset[i].charCodeAt(0);

    if (charCodeNext === charCodePrev + 1) {
      isInRange = true;
    } else if (isInRange) {
      writeRange(charCodeStart, charCodePrev);
      charCodeStart = charCodeNext;
      isInRange = false;
    } else {
      writePoint(charCodeStart);
      charCodeStart = charCodeNext;
    }
  }

  if (isInRange) {
    writeRange(charCodeStart, ((charCodeNext: any): number));
  } else {
    writePoint(charCodeStart);
  }

  return result;
};
