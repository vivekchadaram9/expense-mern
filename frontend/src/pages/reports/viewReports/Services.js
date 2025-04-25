import { ApiMethods, ApiRequest } from "../../../../services/axios";

export const getReportsByUserId = (userId, onSuccess, onFailure) => {
  return ApiRequest({
    method: ApiMethods.GET,
    url: "/report/getByUserId?",
    params: { userId },
  })
    .then((response) => onSuccess && onSuccess(response?.data))
    .catch((error) => onFailure && onFailure(error.message));
};

export const deleteReportByReportId = (reportId, onSuccess, onFailure) => {
  return ApiRequest({
    method: ApiMethods.DELETE,
    url: "/report/deleteReport?",
    params: { reportId },
  })
    .then((response) => onSuccess && onSuccess(response?.data))
    .catch((error) => onFailure && onFailure(error.message));
};
