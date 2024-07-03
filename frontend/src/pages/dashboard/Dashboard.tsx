import React, { useEffect, useState } from "react";

import {
  View,
  Grid,
  Flex,
  Card,
  Placeholder,
  useTheme,
} from "@aws-amplify/ui-react";
import { MdFoodBank, MdWeb,   } from "react-icons/md";

import MiniStatistics from "./MiniStatistics";
import SalesSummary from "./SalesSummary";
import TrafficSummary from "./TrafficSummary";
import LoadingButton from "./LoadingButton";
import "./Dashboard.css";

/// Mock Data
const barChartDataDemo = [
  {
    name: "Consumo",
    data: [
      11, 8, 9, 10, 3, 11, 11, 11, 12, 13, 2, 12, 5, 8, 22, 6, 8, 6, 4, 1, 8,
      24, 29, 51,
    ],
  },
];

const lineChartData = [
  {
    name: "Esperado",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Consumido",
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  },
];

const getChartData = () =>
  new Promise((resolve, reject) => {
    if (!barChartDataDemo) {
      return setTimeout(() => reject(new Error("no data")), 750);
    }

    setTimeout(() => resolve(Object.values(barChartDataDemo)), 750);
  });

const Dashboard = () => {
  const [barChartData, setBarChartData] = useState<any | null>(null);
  const { tokens } = useTheme();

  useEffect(() => {
    const doChartData = async () => {
      const result = await getChartData();
      setBarChartData(result);
    };

    doChartData();
  }, []);

  return (
    <>
      <div>
        <h2>Dashboard</h2>
      </div>
      <View borderRadius="6px" maxWidth="100%" padding="0rem" minHeight="100vh">
        <Grid
          templateColumns={{ base: "1fr", large: "1fr 1fr 1fr" }}
          templateRows={{ base: "repeat(4, 10rem)", large: "repeat(3, 8rem)" }}
          gap={tokens.space.xl}
        >
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics
              title="Cantidad de comida hoy"
              amount="20 g"
              icon={<MdFoodBank  />}
            />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <MiniStatistics title="Cantidad de comida recomendada" amount="79 g" icon={<MdWeb />} />
          </View>
          <View rowSpan={{ base: 1, large: 1 }}>
            <LoadingButton />
          </View>

          <View columnSpan={[1, 1, 1, 2]} rowSpan={{ base: 3, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Distribución de comida durante el día</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <TrafficSummary
                      title="Distribución de comida durante el día"
                      data={barChartData}
                      type="bar"
                      labels={[
                        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
                        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
                        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
                      ]}
                    />
                  </div>
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>
          <View rowSpan={{ base: 1, large: 4 }}>
            <Card height="100%" borderRadius="15px">
              <div className="card-title">American Bobtail</div>
              <div className="chart-wrap">
                <img
                  src="https://cdn.royalcanin-weshare-online.io/GlbQCHwBBKJuub5qnL9Z/v5/bp-lot-3-american-bobtail-davinci"
                  alt="Imagen referencial"
                  style={{ width: "100%", height: "auto", borderRadius: "15px" }}
                />
              </div>
            </Card>
          </View>

          <View columnSpan={[1, 1, 1, 2]} rowSpan={{ base: 3, large: 4 }}>
            <Card borderRadius="15px">
              <div className="card-title">Comida esperada vs consumida</div>
              <div className="chart-wrap">
                {barChartData ? (
                  <div className="row">
                    <SalesSummary
                      title="Sales Summary"
                      data={lineChartData}
                      type="line"
                      labels={[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ]}
                    />
                  </div>
                ) : (
                  <Flex direction="column" minHeight="285px">
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                    <Placeholder size="small" />
                  </Flex>
                )}
              </div>
            </Card>
          </View>

          <View rowSpan={{ base: 1, large: 4 }}>
            <Card height="100%" borderRadius="15px">
              <div className="card-title">Comida sugerida</div>
              <div className="chart-wrap">
                <img
                  src="https://cdn.royalcanin-weshare-online.io/9Gkua2QBG95Xk-RBh9KI/v598/16-indoor-27-b1-ne?fm=jpg&auto=compress"
                  alt="Comida sugerida"
                  style={{ width: "100%", height: "auto", borderRadius: "15px" }}
                />
                <div style={{ padding: "1rem", textAlign: "center" }}>
                  Esta es la comida sugerida para tu mascota. Ayuda a mantener su peso ideal y salud óptima.
                </div>
              </div>
            </Card>
          </View>

        </Grid>
      </View>
    </>
  );
};

export default Dashboard;
