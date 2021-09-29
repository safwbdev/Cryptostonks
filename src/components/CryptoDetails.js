import React, { useState } from "react";
import { useParams } from "react-router";
import HTMLParser from "html-react-parser";
import millify from "millify";
import { Row, Col, Typography, Select, Card } from "antd";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { id } = useParams();
  const [timeperiod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(id);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    id,
    timeperiod,
  });

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading ...";

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="container">
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <img
            className="crypto-image"
            src={cryptoDetails.iconUrl}
            alt={cryptoDetails.name}
            style={{ maxWidth: "80px" }}
          />
          <Title level={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.slug}) Price
          </Title>
          <p>
            {CryptoDetails.name} live price in US dollars. View value
            statistics, market cap and supply.
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Time Period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
        <Row gutter={[32, 32]} className="statistics-row">
          <Col xs={24} sm={12} lg={12}>
            <Card className="coin-stats-card">
              {" "}
              <Title level={3} className="coin-details-heading">
                {CryptoDetails.name} Value Statistics
              </Title>
              <p>An overview showing the stats of {cryptoDetails.name}</p>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={12}>
            <Card className="other-stats-card">
              <Title level={3} className="coin-details-heading">
                Other Statistics
              </Title>
              <p>An overview showing the stats of all the cryptocurrencies</p>
              {genericStats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Card>
          </Col>
        </Row>
        <Row gutter={[32, 32]} className="info-row">
          <Col xs={24} sm={24} lg={16}>
            <Card className="coin-stats-card">
              <Row className="coin-desc">
                <Title level={3} className="coin-details-heading">
                  What is {cryptoDetails.name}?
                </Title>
                <p>{HTMLParser(cryptoDetails.description)}</p>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8} className="coin-links">
            <Card className="coin-links-card">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Links
              </Title>
              {cryptoDetails.links.map((link) => (
                <Row className="coin-link" key={link.name}>
                  <p className="link-name">{link.type}</p>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Row>
              ))}
            </Card>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default CryptoDetails;
