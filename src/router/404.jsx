import { Button, Result } from "antd";
import React from "react";
// import { history } from "umi";

const NoFoundPage = (props) => {
  console.log("this.props", props);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => props.router.navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
