import { LICENSE_STATUS } from "../utils/licenseStatus";

export function verifyLicense({}) {
  return {
    status: LICENSE_STATUS.Valid,
  };
}
