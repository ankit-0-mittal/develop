import * as React from 'react';

/* eslint-disable no-template-curly-in-string */
export const SIGNUP_FORMS = {
  FORM_BASIC_INFO: 'basic',
  FORM_DETAILS: 'details',
};

export const SIGNUP_STEPPER_CONFIG = [
  {
    USER_TYPE: "user",
    STEPS: [
      {
        description: '',
        title: 'Basic Info',
        show: true,
        form: SIGNUP_FORMS.FORM_BASIC_INFO,
        route: '/landlord/basic',
      },
      {
        route: '/landlord/default/details',
        show: false,
      },
    ]
  },
];

export const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getParamsString(params, obj: any = []) {
  var paramsArray = Object.keys(params).map(key => [key, params[key]]);
  obj.length > 0 && paramsArray.push(obj);
  let paramsStatement = ``;
  paramsArray.forEach((x, i) => {
    paramsStatement =
      paramsStatement +
      `${i === 0 ? '?' : ''}${x[0]}=${x[1]}${
        i !== paramsArray.length - 1 ? '&' : ``
      }`;
  });
  return paramsStatement;
}

export type TitleItems = {
  name: string;
  link?: string;
};

export interface TitleProps {
  items: Array<TitleItems>;
}

export const getAssetFromUrl = (name = '') => {
  return `https://eqaro-assets.s3.ap-south-1.amazonaws.com/amenities/${name}`;
};

export function convertToCurrency(number: number = 0) {
  return number !== null
    ? number.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR',
      })
    : number;
}

export function getInitialsForAvatar(name: string = ''): string {
  var names = name.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

export const capitalizeFirst = (text: string = ''): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const currencyFormatter = value =>
  value && `₹ ${value}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');

export const toUpperCase = value => value && value.toUpperCase();

export const checkImageValidity = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

export const checkDocValidity = file => {
  const isJpgOrPng = file.type === 'application/pdf';
  if (!isJpgOrPng) {
    message.error('You can only upload PDF file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 7;
  if (!isLt2M) {
    message.error('Doc must smaller than 10MB!');
  }

  return isJpgOrPng && isLt2M;
};

export const checkAnyDoc = file => true;

export const checkImageOrPdfValidity = file => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  if (acceptedImageTypes.includes(file['type'])) {
    return checkImageValidity(file);
  } else {
    return checkDocValidity(file);
  }
};

export const checkCSVValidity = file => {
  const isJpgOrPng =
    file.type === 'text/csv' || file.type === 'application/vnd.ms-excel';
  if (!isJpgOrPng) {
    message.error('You can only upload csv file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 7;
  if (!isLt2M) {
    message.error('csv must smaller than 10MB!');
  }

  return isJpgOrPng && isLt2M;
};

export const convertToDateTime = date => {
  const format = 'YYYY-MM-DD HH:mm:ss';
  return moment(date).format(format);
};

export const convertToDate = date => {
  const format = 'YYYY-MM-DD';
  return moment(date).format(format);
};

export const convertToIndianDate = date => {
  const format = 'DD-MM-YYYY';
  return moment(date).format(format);
};

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = window.atob(
    b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''),
  );
  const byteArrays: Array<Uint8Array> = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  const myFile = new File([blob], 'image.jpeg', {
    type: 'image/jpeg',
  });
  return myFile;
};

export const scrollToTop = divId => {
  divId.scrollTop = 0;
};

export const scrollToBottom = divId => {
  divId.scrollTop = divId.scrollHeight;
};
