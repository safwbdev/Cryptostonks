import React, { useState } from "react";

import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Slider from "react-slick";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // console.log(cryptoNews);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <>
      {simplified && (
        <Slider {...settings} className="crypto-news-slider">
          {cryptoNews.value?.map((news, i) => (
            <div className="crypto-news-card" key={news.id}>
              <Card hoverable className="news-card">
                <a href={news.url} target="blank" rel="noreferrer">
                  <div className="news-image-container">
                    <img
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt="news"
                    />
                    <Title className="news-title" level={4}>
                      {news.name}
                    </Title>
                  </div>
                  <p>
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)} ...`
                      : news.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={
                          news.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                        alt="news"
                      />
                      <Text className="provider-name">
                        {news.provider[0]?.name}
                      </Text>
                    </div>
                    <Text>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </div>
          ))}
        </Slider>
      )}
      <Row
        gutter={[24, 24]}
        className={
          simplified ? "crypto-news-container-home" : "crypto-news-container"
        }
      >
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children
                  .toLowerCase()
                  .indexOf(input.toLocaleLowerCase()) > 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}

        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={12} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="blank" rel="noreferrer">
                <div className="news-image-container">
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="news"
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
