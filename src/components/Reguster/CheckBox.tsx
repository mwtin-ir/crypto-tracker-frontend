import { Typography, Link, FormControlLabel, Checkbox } from "@mui/material";
import React, {  type ChangeEvent } from "react";
interface Agreements {
  terms: boolean;
  privacy: boolean;
}

export default function AgreementList({
  agreements,
  setAgreements,
}: {
  agreements: Agreements;
  setAgreements: (agreements:Agreements) => void;
}) {


  const handleChange =
    (name: keyof Agreements) => (event: ChangeEvent<HTMLInputElement>) => {
      setAgreements({
        ...agreements,
        [name]: event.target.checked,
        
      });
    };

  return (
    <div className="flex flex-col items-start justify-center ">
      <div className="flex flex-col gap-1">
        <FormControlLabel
          sx={{
            marginRight: "-11px",
          }}
          control={
            <Checkbox
              checked={agreements.terms}
              onChange={handleChange("terms")}
              className="text-green-500 dark:text-green-300"
              sx={{
                color: "inherit",
                "&.Mui-checked": {
                  color: "inherit",
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontFamily: "IRANSansX", fontSize: "14px" }}>
              من{" "}
              <Link
                href="#"
                sx={{
                  color: "inherit",
                  fontWeight: 500,
                  textDecoration: "underline",
                  "&:hover": { color: "#01bc8d" },
                }}
              >
                شرایط استفاده
              </Link>{" "}
              را خوانده و قبول دارم.
            </Typography>
          }
        />
      </div>

      <FormControlLabel
        sx={{
          marginRight: "-11px",
        }}
        control={
          <Checkbox
            className="rounded-full"
            checked={agreements.privacy}
            onChange={handleChange("privacy")}
            sx={{
              color: "inherit",
              "&.Mui-checked": {
                color: "inherit",
              },
            }}
          />
        }
        label={
          <Typography sx={{ fontFamily: "IRANSansX", fontSize: "14px" }}>
            من{" "}
            <Link
              href="#"
              sx={{
                color: "inherit",
                fontWeight: 500,
                textDecoration: "underline",
                "&:hover": { color: "#01bc8d" },
              }}
            >
              سیاست حفظ حریم خصوصی
            </Link>{" "}
            را خوانده و قبول دارم.
          </Typography>
        }
      />
    </div>
  );
}
