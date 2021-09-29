import React from "react";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { CryptoCurrencies, News } from ".";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";

const { Title } = Typography;

const Home = ({ noPadding }) => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  const column = 8;

  if (isFetching) return <Loader />;
  //   console.log(globalStats);

  return (
    <div className="home-container">
      <Title level={2} className="heading">
        Global Crypto Statistics
      </Title>
      <Row gutter={[32, 32]} className="global-stat-row">
        <Col xs={24} sm={12} lg={column}>
          <Card className="global-stat-card">
            <Statistic
              title="Total CryptoCurrencies"
              value={globalStats.total}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={column}>
          <Card className="global-stat-card">
            <Statistic
              title="Total Exchange"
              value={millify(globalStats.totalExchanges)}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={column}>
          <Card className="global-stat-card">
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats.totalMarketCap)}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={column}>
          <Card className="global-stat-card">
            <Statistic
              title="Total 24 Hour Volume"
              value={millify(globalStats.total24hVolume)}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={column}>
          <Card className="global-stat-card">
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
            />
          </Card>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Title level={5} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <CryptoCurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest News
        </Title>
        <Title level={5} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified={true} />
    </div>
  );
};

export default Home;
