import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        value={filter.querry}
        onChange={(e) => setFilter({ ...filter, querry: e.target.value })}
        placeholder="Search..."
      ></MyInput>
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sort by"
        options={[
          { value: "title", name: "By title" },
          { value: "body", name: "By Description" },
        ]}
      />
    </div>
  );
};

export default Filter;
