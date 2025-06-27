import React, { useEffect, useState } from 'react';
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import '../../css/admin_sub/statistic.css'; // 📦 CSS 파일 import

import refreshApi from "../../component/refreshApi.jsx"

const COLORS = ['#4D4352', '#B3A7B8', '#C3532B', '#FF875B', '#2E2A33'];

const Statistics = () => {
  const [kpi, setKpi] = useState({});
  // const [regionData, setRegionData] = useState([]);
  const [statusCodeData, setStatusCodeData] = useState([{}]);
  const [errorPathData, setErrorPathData] = useState([{}]);
  const [hourlyRequestDataByDay, setHourlyRequestDataByDay] = useState([{}]);
  const [byteSentPerHour, setByteSentPerHour] = useState([{}]);

  useEffect(() => {
    const kpi = async() => {
      await refreshApi.get(
        "/statistic/kpi"
      )
      .then((res) => {
        console.log("kpi", res);
        setKpi(res.data);
        return res;
      })
    }
    const statusCodeData = async() => {
      await refreshApi.get(
        "/statistic/statusCodeData"
      )
      .then((res) => {
        console.log("statusCodeData", res);
        setStatusCodeData(res.data);
        return res;
      })
    }
    const errorPathData = async() => {
      await refreshApi.get(
        "/statistic/errorPathData"
      )
      .then((res) => {
        console.log("errorPathData", res);
        setErrorPathData(res.data);
        return res;
      })
    }
    const hourlyRequestDataByDay = async() => {
      await refreshApi.get(
        "/statistic/hourlyRequestDataByDay"
      )
      .then((res) => {
        console.log("hourlyRequestDataByDay", res);
        setHourlyRequestDataByDay([...res.data].reverse());
        return res;
      })
    }
    const byteSentPerHour = async() => {
      await refreshApi.get(
        "/statistic/byteSentPerHour"
      )
      .then((res) => {
        console.log("byteSentPerHour", res);
        setByteSentPerHour([...res.data].reverse());
        return res;
      })
    }

    kpi();
    statusCodeData();
    errorPathData();
    hourlyRequestDataByDay();
    byteSentPerHour();

  }, []);

    return (
    <div className="static-container">
      <div className="static-header">
        <h1 className="static-title">서버 통계</h1>
        <p className="static-subtitle">실시간 서버 접속 및 요청 분석</p>
      </div>

      <div className="static-kpi-grid">
        <KpiCard title="방문자 수" value={`${kpi.visitors}명`} />
        <KpiCard title="로그인 사용자" value={`${kpi.logInUsers}명`} />
        <KpiCard title="로그인 비율" value={`${kpi.logInRate}%`} />
        <KpiCard title="총 요청 수" value={`${kpi.totalRequests}건`} />
        <KpiCard title="데이터 전송량" value={`${(kpi.totalBytes / 100).toFixed(2)}GB`} />
        <KpiCard title="에러 발생" value={`${kpi.totalErrors}건`} />
      </div>

      <div className="static-charts-grid">

        <Card title="HTTP 에러 코드 분포">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusCodeData} dataKey="value" nameKey="statusCode" cx="50%" cy="50%" outerRadius={100} labelLine={false}
                label={({ statusCode, percent }) => `${statusCode} (${(percent * 100).toFixed(1)}%)`}>
                {statusCodeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="에러 발생 경로 TOP 5">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={errorPathData} dataKey="value" nameKey="requestLocation" cx="50%" cy="50%" outerRadius={100} labelLine={false}
                label={({ requestLocation, percent }) => (percent > 0.1 ? requestLocation + "\n" + (percent * 100).toFixed(1) + "%": '')} auto>
                {errorPathData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="요일별 시간대 요청 패턴">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={hourlyRequestDataByDay}>
              <XAxis dataKey="hour" tick={{ fill: '#fff' }} />
              <YAxis tick={{ fill: '#fff' }} />
              <Tooltip contentStyle={{ backgroundColor: '#000', color: '#fff' }} />
              <Legend wrapperStyle={{ color: '#fff' }} />
              {Object.keys(hourlyRequestDataByDay[0])
                .filter(k => k !== 'hour')
                .map((day, idx) => (
                  <Line key={day} type="monotone" dataKey={day} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} dot={{ r: 4 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="시간대별 평균 응답 크기">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={byteSentPerHour}>
              <XAxis dataKey="hour" tick={{ fill: '#fff' }} />
              <YAxis tick={{ fill: '#fff' }} />
              <Tooltip contentStyle={{ backgroundColor: '#000', color: '#fff' }} />
              <Legend wrapperStyle={{ color: '#fff' }} />
              {Object.keys(byteSentPerHour[0])
                .filter(k => k !== 'hour')
                .map((day, idx) => (
                  <Line key={day} type="monotone" dataKey={day} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} dot={{ r: 4 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value }) => {
  return (
    <div className="static-kpi-card">
      <h4 className="static-kpi-title">{title}</h4>
      <p className="static-kpi-value">{value}</p>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="static-chart-card">
    <h3 className="static-chart-title">{title}</h3>
    <div className="static-chart-container">
      {children}
    </div>
  </div>
);

export default Statistics;
