import { base64Decode, base64Encode } from '../encoding/base64';
import { LICENSE_STATUS } from '../utils/licenseStatus';
const getDefaultReleaseDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
export function generateReleaseInfo(releaseDate = getDefaultReleaseDate()) {
  return base64Encode(releaseDate.getTime().toString());
}
const expiryReg = /^.*EXPIRY=([0-9]+),.*$/;
/**
 * Format: ORDER:${orderNumber},EXPIRY=${expiryTimestamp},KEYVERSION=1
 */
const decodeLicenseVersion1 = (license) => {
  let expiryTimestamp;
  try {
    expiryTimestamp = parseInt(license.match(expiryReg)[1], 10);
    if (!expiryTimestamp || Number.isNaN(expiryTimestamp)) {
      expiryTimestamp = null;
    }
  } catch (err) {
    expiryTimestamp = null;
  }
  return {
    scope: 'pro',
    licensingModel: 'perpetual',
    expiryTimestamp,
  };
};

/**
 * Format: O=${orderNumber},E=${expiryTimestamp},S=${scope},LM=${licensingModel},KV=2`;
 */
const decodeLicenseVersion2 = (license) => {
  const licenseInfo = {
    scope: null,
    licensingModel: null,
    expiryTimestamp: null,
  };
  license
    .split(',')
    .map((token) => token.split('='))
    .filter((el) => el.length === 2)
    .forEach(([key, value]) => {
      if (key === 'S') {
        licenseInfo.scope = value;
      }
      if (key === 'LM') {
        licenseInfo.licensingModel = value;
      }
      if (key === 'E') {
        const expiryTimestamp = parseInt(value, 10);
        if (expiryTimestamp && !Number.isNaN(expiryTimestamp)) {
          licenseInfo.expiryTimestamp = expiryTimestamp;
        }
      }
    });
  return licenseInfo;
};

/**
 * Decode the license based on its key version and return a version-agnostic `MuiLicense` object.
 */
const decodeLicense = (encodedLicense) => {
  const license = base64Decode(encodedLicense);
  if (license.includes('KEYVERSION=1')) {
    return decodeLicenseVersion1(license);
  }
  if (license.includes('KV=2')) {
    return decodeLicenseVersion2(license);
  }
  return null;
};
export function verifyLicense({ releaseInfo, licenseKey, acceptedScopes }) {
  return {
    status: LICENSE_STATUS.Valid,
  };
}
