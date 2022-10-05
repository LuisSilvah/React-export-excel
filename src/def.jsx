import React from "react";
import { saveAs } from "file-saver";
// import XLSX from "xlsx";
import PropTypes from "prop-types";
import classNames from "classnames";
import XLSX from "xlsx-color";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

const DownloadExcel = ({
  fileName,
  buttonLabel,
  invisible,
  data,
  itemKey,
  className
}) => {
  function s2ab(s) {
    if (typeof s === "object") {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i !== view.length; i++) {
        view[i] = s.charCodeAt && s.charCodeAt(i) & 0xff;
      }
      return buf;
    }
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    console.log(ws);
    ws["A1"].s = {
      fill: {
        patternType: "solid",
        fgColor: { rgb: "FF939393" }
      },
      font: {
        name: "Times New Roman",
        sz: 16,
        color: { rgb: "#FF000000" },
        bold: false,
        italic: false,
        underline: false
      }
    };
    ws["C1"].s = {
      fill: {
        patternType: "solid",
        fgColor: { rgb: "FF939393" }
      }
    };
    ws["B1"].s = {
      fill: {
        patternType: "solid",
        fgColor: { rgb: "FF939393" }
      }
    };
    const wb = {
      Sheets: {
        data: ws
      },
      SheetNames: ["data"],
      Workbook: { Views: [{ RTL: false }] }
    };

    const eb = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([eb], { type: EXCEL_TYPE });
    saveAs(blob, fileName + EXCEL_EXTENSION);
  };

  const style = {};
  if (invisible) style.display = "none";

  return (
    <button
      id={itemKey}
      onClick={exportToExcel}
      style={style}
      className={classNames({
        [className]: className
      })}
    >
      {buttonLabel}
    </button>
  );
};

DownloadExcel.propTypes = {
  fileName: PropTypes.string.isRequired,
  invisible: PropTypes.bool,
  data: PropTypes.array.isRequired,
  buttonLabel: PropTypes.string,
  itemKey: PropTypes.string,
  className: PropTypes.string
};

DownloadExcel.defaultProps = {
  invisible: false,
  buttonLabel: "Download Excel",
  itemKey: "",
  fileName: "sample"
};

export default DownloadExcel;
