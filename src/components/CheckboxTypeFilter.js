import React from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CheckboxTypeFilter = (props) => {
  const onChange = (ckeckedValues) => {
    const filterCopy = props.filter;
    filterCopy.checkedOptions = ckeckedValues;
    filterCopy.queryString = ckeckedValues
      .map((value) => `&${filterCopy.apiParameter}=${value}`)
      .join("");

    props.setter(filterCopy);
  };

  return (
    <Collapse defaultActiveKey="0">
      <Panel header={props.filter.name} key="1">
        <Checkbox.Group
          options={props.filter.options}
          name={props.filter.apiParameter}
          onChange={(checkedValues) => onChange(checkedValues)}
        />
      </Panel>
    </Collapse>
  );
};

export default CheckboxTypeFilter;