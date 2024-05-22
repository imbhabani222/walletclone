"use client";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },

  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#3633b7",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#3633b7",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#3633b7",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#3633b7",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

export const QontoStepIcon = (props) => {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
};

const businessType = ["Individual", "Proprietorship", "Un Registered"];

export const returnStepperLabel = (data) => {
  if (data.gst === "No") {
    if (businessType.includes(data.bussiness_type || null)) {
      return ["Proof of Identity", "Additional Proof"];
    } else {
      return [
        "Proof of Identity",
        "Additional Proof(part 1)",
        "Additional Proof(part 2)",
      ];
    }
  } else {
    if (businessType.includes(data.bussiness_type || null)) {
      return ["Proof of Business", "Proof of Identity", "Additional Proof"];
    } else {
      return [
        "Proof of Business",
        "Proof of Identity",
        "Additional Proof(part 1)",
        "Additional Proof(part 2)",
      ];
    }
  }
};
