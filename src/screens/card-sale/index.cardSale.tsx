import React, { useState } from "react";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import {
  Dropdown,
  IconTitleButton,
  SearchBar,
  TableWithSorting,
  TypographyCustom,
} from "../../components/index.components";
import { CONSTANTS, makeApiCall } from "../../utils/index.utils";

type Dtos = {};

const KitIcon = () => {
  return <HomeRepairServiceOutlinedIcon />;
};
const PersonalisedSaleIcon = () => {
  return <AccountBoxOutlinedIcon />;
};
const ReissueIcon = () => {
  return <FitScreenOutlinedIcon />;
};

const TITLE = {
  KIT: "Kit",
  PS: "Personalised Sale",
  REISSUE: "Reissue",
};

export const CardSaleScreen: React.FC<Dtos> = ({}) => {
  const [tabledata, setTabledata] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const onSearchApi = async ({ value = "", offset = 0, limit = 50 }) => {
    const { data } = await makeApiCall({
      endPoint: "forex/account/search",
      method: "POST",
      body: {
        value,
        branchId: "4ff819ab-00ea-45b8-9544-205407c0680c",
        page: offset,
        pageSize: limit,
      },
    });
    setTabledata(data?.records);
  };

  const onClick = (value: string) => {
    switch (value) {
      case TITLE.KIT:
        setSelectedTab(0);
        break;
      case TITLE.PS:
        setSelectedTab(1);
        break;
      case TITLE.REISSUE:
        setSelectedTab(2);
        break;
      default:
        setSelectedTab(0);
        break;
    }
  };

  return (
    <div style={{ backgroundColor: "#f2f0f0", paddingTop: 20 }}>
      {/* <Dropdown
        labelT={"Alpha User"}
        options={["Alpha User"]}
        defaultSelected={"Alpha User"}
      /> */}

      {/* Header */}
      <div
        style={{
          background: "white",
          margin: 20,
          padding: 20,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <TypographyCustom type={"subtitle1"} title={"New Card Sale"} />
          <TypographyCustom type={"subtitle2"} title={"Issue New Card"} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
            marginTop: 4,
          }}
        >
          <IconTitleButton
            type={"button"}
            title={TITLE.KIT}
            CustomIcon={KitIcon}
            textCustomStyle={{}}
            boxCustomStyle={{ marginRight: 4 }}
            isSelected={selectedTab === 0}
            key={"kit"}
            onClick={onClick}
          />
          <IconTitleButton
            type={"button"}
            title={TITLE.PS}
            CustomIcon={PersonalisedSaleIcon}
            boxCustomStyle={{ marginLeft: 4, marginRight: 4 }}
            isSelected={selectedTab === 1}
            key={"personalised_sale"}
            onClick={onClick}
          />
          <IconTitleButton
            type={"button"}
            title={TITLE.REISSUE}
            CustomIcon={ReissueIcon}
            boxCustomStyle={{ marginLeft: 4, marginRight: 4 }}
            isSelected={selectedTab === 2}
            key={"reissue"}
            onClick={onClick}
          />
        </div>
      </div>

      {selectedTab === 0 && (
        <>
          {/* Search */}
          <div
            style={{
              background: "white",
              margin: 20,
              padding: 20,
              borderRadius: 8,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <SearchBar onSearch={onSearchApi} />
          </div>

          {/* List item */}
          <TableWithSorting tabledata={tabledata.length > 0 ? tabledata : []} />
        </>
      )}
    </div>
  );
};
