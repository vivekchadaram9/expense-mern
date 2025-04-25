import { ApiMethods, ApiRequest } from "../../../../services/axios";

export const getAllReportTypes = async (onSuccess, onFailure) => {
  await ApiRequest({
    method: ApiMethods.GET,
    url: "reportType/getAllReportTypes",
  })
    .then((response) => {
      onSuccess && onSuccess(response?.data);
    })
    .catch((error) => {
      onFailure && onFailure(error.message);
    });
};

export const saveNewReport = async (data, onSuccess, onFailure) => {
  await ApiRequest({
    url: "report/saveReport",
    method: ApiMethods.POST,
    data,
  })
    .then((response) => {
      onSuccess && onSuccess(response);
    })
    .catch((error) => {
      onFailure && onFailure(error.message);
    });
};

export const updateReport = async (reportId,data, onSuccess, onFailure) => {
  await ApiRequest({
    url: "report/updateReport",
    method: ApiMethods.PUT,
    params:{reportId},
    data,
  })
    .then((response) => {
      onSuccess && onSuccess(response);
    })
    .catch((error) => {
      onFailure && onFailure(error.message);
    });
};
