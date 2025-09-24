import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const processPieChartData = (stats) => {
  if (!stats || stats.length === 0) {
    return [];
  }

  const artilheiros = stats
    .filter((jogador) => jogador.gols > 0)
    .sort((a, b) => b.gols - a.gols);

  const totalGols = artilheiros.reduce((sum, jogador) => sum + jogador.gols, 0);

  if (totalGols === 0) return [];

  const top3 = artilheiros.slice(0, 3);
  const demaisJogadores = artilheiros.slice(3);

  const pieData = top3.map((jogador) => ({
    name: jogador.nome,
    value: jogador.gols,
    percentage: ((jogador.gols / totalGols) * 100).toFixed(1),
  }));

  if (demaisJogadores.length > 0) {
    const golsDosDemais = demaisJogadores.reduce(
      (sum, jogador) => sum + jogador.gols,
      0
    );
    pieData.push({
      name: "Demais Jogadores",
      value: golsDosDemais,
      percentage: ((golsDosDemais / totalGols) * 100).toFixed(1),
    });
  }

  return pieData;
};

const COLORS = ["#FACC15", "#C0C0C0", "#CD7F32", "#6B7280"];

const CustomTooltipContainer = styled.div`
  background-color: rgba(10, 25, 47, 0.9);
  border: 1px solid #facc15;
  border-radius: 8px;
  padding: 12px;
  color: #e6f1ff;
  font-family: "Roboto", sans-serif;
`;

const TooltipLabel = styled.p`
  font-weight: bold;
  margin-bottom: 4px;
`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <CustomTooltipContainer>
        <TooltipLabel>{data.name}</TooltipLabel>
        <p>Gols: {data.value}</p>
        <p>Distribuição: {data.percentage}%</p>
      </CustomTooltipContainer>
    );
  }
  return null;
};

const GoalDistributionChart = ({ stats }) => {
  const pieData = useMemo(() => processPieChartData(stats), [stats]);

  if (pieData.length === 0) {
    return <p style={{ textAlign: 'center', padding: '20px', color: '#cbd5e1' }}>Sem dados de gols para exibir.</p>;
  }

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalDistributionChart;