import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetCryptoExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const cryptoExchanges = data?.data?.exchanges;

  console.log(cryptoExchanges);

  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{ paddingBottom: "1rem" }}>
        <Col span={6}>
          <Text>Exchanges</Text>
        </Col>
        <Col span={6}>
          <Text>24h Trade Volume</Text>
        </Col>
        <Col span={6}>
          <Text>Markets</Text>
        </Col>
        <Col span={6}>
          <Text>Change</Text>
        </Col>
      </Row>
      <Row>
        {cryptoExchanges.map((item) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={item.id}
                showArrow={false}
                header={
                  <Row key={item.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{item.rank}.</strong>
                      </Text>
                      <Avatar className="exchange-image" src={item.iconUrl} />
                      <Text>
                        <strong>{item.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>
                      <Text>${millify(item.volume)}</Text>
                    </Col>
                    <Col span={6}>
                      <Text>{millify(item.numberOfMarkets)}</Text>
                    </Col>
                    <Col span={6}>
                      <Text>{millify(item.marketShare)}%</Text>
                    </Col>
                  </Row>
                }
              >
                {HTMLReactParser(item.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
