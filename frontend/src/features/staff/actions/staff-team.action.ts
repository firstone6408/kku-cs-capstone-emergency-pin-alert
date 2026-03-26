"use server";

import { ACTION_CONFIG } from "@/configs/action.config";
import { actionResponse } from "@/lib/action";
import { InitialFormState } from "@/types/actions/action";
import {
  createTeamStaff,
  joinTeamStaff,
  kickMemberTeamStaff,
  leaveTeamStaff,
} from "../services/staff-team.service";

export async function createTeamStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    name: formData.get("team-name") as string,
  };

  const result = await createTeamStaff(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.CREATED,
    });
  }
}

export async function joinTeamStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    teamId: (() => {
      const value = formData.get("team-id") as string;
      return parseInt(value);
    })(),
  };

  const result = await joinTeamStaff(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.SAVED,
    });
  }
}

export async function leaveTeamStaffAction(
  _prevState: InitialFormState,
  _formData: FormData,
) {
  const result = await leaveTeamStaff();

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.SAVED,
    });
  }
}

export async function kickMemberTeamStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    memberId: (() => {
      const value = formData.get("member-id") as string;
      return parseInt(value);
    })(),
  };

  const result = await kickMemberTeamStaff(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.SAVED,
    });
  }
}
