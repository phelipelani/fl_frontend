import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
    FaTrophy, 
    FaRegSadTear, 
    FaFutbol, 
    FaHandsHelping, 
    FaChartLine, 
    FaMedal,
    FaFilter,
    FaCrown,
    FaFire,
    FaClock,
    FaUsers,
    FaGamepad
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { getLigas, getEstatisticas } from '../services/api';
import BackButton from '../components/common/BackButton';

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    
    @media (min-width: 768px) {
        padding: 20px;
    }
`;

const Header = styled(motion.div)`
    width: 100%;
    max-width: 1600px;
    text-align: center;
    margin-bottom: 15px;
    
    @media (orientation: landscape) and (max-height: 500px) {
        margin-bottom: 10px;
    }
`;

const Title = styled.h1`
    font-family: 'Oswald', sans-serif;
    font-size: 1.8rem;
    color: #e6f1ff;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0 0 5px 0;
    
    @media (min-width: 768px) {
        font-size: 2.2rem;
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        font-size: 1.5rem;
        margin: 0;
    }
`;

const FiltroContainer = styled(motion.div)`
    margin-bottom: 20px;
    width: 100%;
    max-width: 350px;
    position: relative;
    
    @media (orientation: landscape) and (max-height: 500px) {
        margin-bottom: 15px;
        max-width: 300px;
    }
`;

const FilterIcon = styled(FaFilter)`
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #0a192f;
    z-index: 1;
`;

const Select = styled.select`
    width: 100%;
    padding: 12px 12px 12px 40px;
    background-color: rgba(255, 255, 255, 0.95);
    border: 2px solid transparent;
    border-radius: 10px;
    font-size: 0.95rem;
    color: #0a192f;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:focus {
        outline: none;
        border-color: #facc15;
        box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.2);
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        padding: 8px 8px 8px 35px;
        font-size: 0.85rem;
    }
`;

const MainGrid = styled(motion.div)`
    width: 100%;
    max-width: 1600px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    
    @media (min-width: 1200px) {
        grid-template-columns: 350px 1fr 300px;
        gap: 20px;
    }
    
    @media (orientation: landscape) and (max-height: 600px) {
        grid-template-columns: 280px 1fr 280px;
        gap: 15px;
    }
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    @media (max-width: 1199px) {
        order: 2;
    }
`;

const CenterColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    @media (max-width: 1199px) {
        order: 1;
    }
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    @media (max-width: 1199px) {
        order: 3;
    }
`;

const KpiRow = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 15px;
    
    @media (min-width: 640px) {
        grid-template-columns: repeat(4, 1fr);
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        gap: 10px;
        margin-bottom: 10px;
    }
`;

const InfoRow = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    
    @media (min-width: 640px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (min-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        gap: 10px;
    }
`;

const KpiCard = styled(motion.div)`
    background: linear-gradient(135deg, rgba(10, 25, 47, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%);
    padding: 15px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid rgba(250, 204, 21, 0.3);
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #facc15, #f59e0b);
        border-radius: 12px 12px 0 0;
    }
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(250, 204, 21, 0.3);
        border-color: rgba(250, 204, 21, 0.5);
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        padding: 10px;
    }
`;

const KpiHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 8px;
    
    @media (orientation: landscape) and (max-height: 500px) {
        margin-bottom: 5px;
        gap: 5px;
    }
`;

const KpiIcon = styled.div`
    font-size: 1.2rem;
    color: #facc15;
    
    @media (orientation: landscape) and (max-height: 500px) {
        font-size: 1rem;
    }
`;

const KpiTitle = styled.p`
    color: #cbd5e1;
    font-size: 0.8rem;
    margin: 0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    @media (orientation: landscape) and (max-height: 500px) {
        font-size: 0.7rem;
    }
`;

const KpiValue = styled.p`
    font-size: 1.1rem;
    font-weight: 800;
    color: #facc15;
    margin: 0;
    word-break: break-word;
    line-height: 1.2;
    
    @media (min-width: 768px) {
        font-size: 1.3rem;
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        font-size: 1rem;
    }
`;

const ChartContainer = styled(motion.div)`
    background: linear-gradient(135deg, rgba(10, 25, 47, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%);
    border-radius: 12px;
    padding: 15px;
    border: 1px solid rgba(250, 204, 21, 0.2);
    backdrop-filter: blur(20px);
    
    @media (orientation: landscape) and (max-height: 500px) {
        padding: 10px;
    }
`;

const ChartTitle = styled.h3`
    color: #e6f1ff;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    @media (min-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 15px;
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        font-size: 0.9rem;
        margin-bottom: 8px;
    }
`;

const ChartIcon = styled.div`
    color: #facc15;
    font-size: 1.1rem;
    
    @media (orientation: landscape) and (max-height: 500px) {
        font-size: 1rem;
    }
`;

const LoadingContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    color: #94a3b8;
    font-size: 1.1rem;
    padding: 60px 20px;
`;

const Tabela = styled(motion.div)`
    background: linear-gradient(135deg, rgba(10, 25, 47, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(250, 204, 21, 0.2);
    backdrop-filter: blur(20px);
`;

const TabelaHeader = styled.div`
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    padding: 12px 15px;
    text-align: center;
    font-size: 1rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid rgba(250, 204, 21, 0.3);
    
    @media (orientation: landscape) and (max-height: 500px) {
        padding: 8px 12px;
        font-size: 0.9rem;
    }
`;

const TabelaContainer = styled.div`
    max-height: 400px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.5);
    }
    
    &::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #facc15, #f59e0b);
        border-radius: 3px;
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        max-height: 250px;
    }
`;

const TabelaRow = styled(motion.div)`
    display: grid;
    grid-template-columns: 40px 1fr 50px 35px 35px 35px 35px;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(250, 204, 21, 0.1);
    font-size: 0.85rem;
    transition: all 0.3s ease;

    &:last-child {
        border-bottom: none;
    }
    
    &.header {
        font-weight: 700;
        color: #cbd5e1;
        background: rgba(30, 41, 59, 0.6);
        position: sticky;
        top: 0;
        z-index: 2;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.3px;
    }
    
    &:not(.header):hover {
        background: rgba(250, 204, 21, 0.08);
    }
    
    @media (orientation: landscape) and (max-height: 500px) {
        padding: 6px 10px;
        font-size: 0.8rem;
        grid-template-columns: 35px 1fr 45px 30px 30px 30px 30px;
    }
`;

const CellContent = styled.span`
    text-align: ${props => props.center ? 'center' : 'left'};
    font-weight: ${props => props.bold ? '700' : '500'};
    color: ${props => props.highlight ? '#facc15' : '#e6f1ff'};
    
    ${props => props.position && `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: ${
            props.position <= 3 ? 
            'linear-gradient(135deg, #facc15, #f59e0b)' : 
            'rgba(148, 163, 184, 0.2)'
        };
        color: ${props.position <= 3 ? '#0a192f' : '#94a3b8'};
        font-weight: 800;
        font-size: 0.8rem;
    `}
    
    @media (orientation: landscape) and (max-height: 500px) {
        ${props => props.position && `
            width: 22px;
            height: 22px;
            font-size: 0.7rem;
        `}
    }
`;

const PlayerName = styled(CellContent)`
    font-weight: 600;
    color: #e6f1ff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const HorizontalBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    @media (orientation: landscape) and (max-height: 500px) {
        gap: 6px;
    }
`;

const HorizontalBarItem = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 10px;
    
    @media (orientation: landscape) and (max-height: 500px) {
        gap: 8px;
    }
`;

const PlayerNameBar = styled.div`
    min-width: 60px;
    font-size: 0.8rem;
    color: #e6f1ff;
    font-weight: 600;
    text-align: right;
    
    @media (orientation: landscape) and (max-height: 500px) {
        min-width: 50px;
        font-size: 0.75rem;
    }
`;

const BarContainer = styled.div`
    flex: 1;
    height: 20px;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    
    @media (orientation: landscape) and (max-height: 500px) {
        height: 16px;
    }
`;

const BarFill = styled(motion.div)`
    height: 100%;
    background: linear-gradient(90deg, #facc15, #f59e0b);
    border-radius: 10px;
    position: relative;
`;

const BarValue = styled.div`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.7rem;
    color: #0a192f;
    font-weight: 700;
    
    @media (orientation: landscape) and (max-height: 500px) {
        font-size: 0.65rem;
        right: 6px;
    }
`;

const COLORS = ['#facc15', '#f59e0b', '#d97706', '#92400e', '#78350f'];

const EstatisticasPage = () => {
    const [ligas, setLigas] = useState([]);
    const [selectedLiga, setSelectedLiga] = useState('');
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLigas = async () => {
            const data = await getLigas();
            setLigas(data);
        };
        fetchLigas();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const data = await getEstatisticas(selectedLiga);
            setStats(data);
            setLoading(false);
        };
        fetchStats();
    }, [selectedLiga]);

    const kpis = useMemo(() => {
        if (!stats || stats.length === 0) {
            return { mvp: '-', peDeRato: '-', artilheiro: '-', assistente: '-' };
        }
        const mvp = stats[0];
        const peDeRato = stats[stats.length - 1];
        const artilheiro = [...stats].sort((a, b) => b.gols - a.gols)[0];
        const assistente = [...stats].sort((a, b) => b.assistencias - a.assistencias)[0];
        return {
            mvp: mvp.nome,
            peDeRato: peDeRato.nome,
            artilheiro: `${artilheiro.nome} (${artilheiro.gols})`,
            assistente: `${assistente.nome} (${assistente.assistencias})`,
        };
    }, [stats]);

    const ligaInfo = useMemo(() => {
        if (!stats || stats.length === 0) return {};
        
        const totalJogos = stats.reduce((sum, p) => sum + p.vitorias + p.empates + p.derrotas, 0);
        const totalGols = stats.reduce((sum, p) => sum + p.gols, 0);
        const totalAssistencias = stats.reduce((sum, p) => sum + (p.assistencias || 0), 0);
        const totalJogadores = stats.length;
        // Simulando tempo de bola rolando (90min por jogo em média)
        const tempoBola = Math.round(totalJogos * 90 / 60); // em horas
        const mediaGolsPorMinuto = totalJogos > 0 ? (totalGols / (totalJogos * 90)).toFixed(2) : 0;
        
        return {
            totalGols,
            totalJogos,
            totalAssistencias,
            totalJogadores,
            tempoBola,
            mediaGolsPorMinuto
        };
    }, [stats]);

    const chartData = useMemo(() => {
        if (!stats || stats.length === 0) return [];
        return stats.slice(0, 10).map(player => ({
            nome: player.nome.length > 8 ? player.nome.substring(0, 8) + '..' : player.nome,
            pontos: player.total_pontos
        }));
    }, [stats]);

    const topArtilheiros = useMemo(() => {
        if (!stats || stats.length === 0) return [];
        const sorted = [...stats].sort((a, b) => b.gols - a.gols);
        const maxGols = sorted[0]?.gols || 1;
        return sorted.slice(0, 8).map(player => ({
            ...player,
            percentage: (player.gols / maxGols) * 100
        }));
    }, [stats]);

    const topAssistentes = useMemo(() => {
        if (!stats || stats.length === 0) return [];
        const sorted = [...stats].sort((a, b) => (b.assistencias || 0) - (a.assistencias || 0));
        const maxAssist = sorted[0]?.assistencias || 1;
        return sorted.slice(0, 8).map(player => ({
            ...player,
            percentage: ((player.assistencias || 0) / maxAssist) * 100
        }));
    }, [stats]);

    const pieData = useMemo(() => {
        if (!stats || stats.length === 0) return [];
        const top5 = stats.slice(0, 5);
        const others = stats.slice(5);
        const othersTotal = others.reduce((sum, player) => sum + player.total_pontos, 0);
        
        const data = top5.map(player => ({
            name: player.nome,
            value: player.total_pontos
        }));
        
        if (othersTotal > 0) {
            data.push({ name: 'Outros', value: othersTotal });
        }
        
        return data;
    }, [stats]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'rgba(10, 25, 47, 0.95)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #facc15',
                    color: '#e6f1ff',
                    fontSize: '0.9rem'
                }}>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ margin: 0, color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <PageContainer>
                <LoadingContainer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <FaFutbol size={40} color="#facc15" />
                    </motion.div>
                    <span>Carregando estatísticas...</span>
                </LoadingContainer>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Header
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Title>
                    <FaChartLine />
                    Dashboard Estatísticas
                </Title>
            </Header>

            <FiltroContainer
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <FilterIcon />
                <Select 
                    value={selectedLiga} 
                    onChange={(e) => setSelectedLiga(e.target.value)}
                >
                    <option value="">📊 Todas as Ligas</option>
                    {ligas.map(liga => (
                        <option key={liga.id} value={liga.id}>{liga.nome}</option>
                    ))}
                </Select>
            </FiltroContainer>

            <KpiRow variants={itemVariants}>
                <KpiCard whileHover={{ scale: 1.03 }}>
                    <KpiHeader>
                        <KpiIcon><FaCrown /></KpiIcon>
                        <KpiTitle>MVP</KpiTitle>
                    </KpiHeader>
                    <KpiValue>{kpis.mvp}</KpiValue>
                </KpiCard>
                
                <KpiCard whileHover={{ scale: 1.03 }}>
                    <KpiHeader>
                        <KpiIcon><FaRegSadTear /></KpiIcon>
                        <KpiTitle>Pé de Rato</KpiTitle>
                    </KpiHeader>
                    <KpiValue>{kpis.peDeRato}</KpiValue>
                </KpiCard>
                
                <KpiCard whileHover={{ scale: 1.03 }}>
                    <KpiHeader>
                        <KpiIcon><FaFire /></KpiIcon>
                        <KpiTitle>Artilheiro</KpiTitle>
                    </KpiHeader>
                    <KpiValue>{kpis.artilheiro}</KpiValue>
                </KpiCard>
                
                <KpiCard whileHover={{ scale: 1.03 }}>
                    <KpiHeader>
                        <KpiIcon><FaHandsHelping /></KpiIcon>
                        <KpiTitle>Assistente</KpiTitle>
                    </KpiHeader>
                    <KpiValue>{kpis.assistente}</KpiValue>
                </KpiCard>
            </KpiRow>

            <MainGrid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <LeftColumn>
                    <Tabela variants={itemVariants}>
                        <TabelaHeader>
                            <FaMedal />
                            Classificação Geral
                        </TabelaHeader>
                        <TabelaContainer>
                            <TabelaRow className="header">
                                <CellContent center>Pos</CellContent>
                                <CellContent>Jogador</CellContent>
                                <CellContent center>Pts</CellContent>
                                <CellContent center>V</CellContent>
                                <CellContent center>E</CellContent>
                                <CellContent center>D</CellContent>
                                <CellContent center>G</CellContent>
                            </TabelaRow>
                            {stats.map((j, i) => (
                                <TabelaRow key={j.id}>
                                    <CellContent center position={i + 1}>{i + 1}</CellContent>
                                    <PlayerName>{j.nome}</PlayerName>
                                    <CellContent center bold highlight>{j.total_pontos}</CellContent>
                                    <CellContent center>{j.vitorias}</CellContent>
                                    <CellContent center>{j.empates}</CellContent>
                                    <CellContent center>{j.derrotas}</CellContent>
                                    <CellContent center>{j.gols}</CellContent>
                                </TabelaRow>
                            ))}
                        </TabelaContainer>
                    </Tabela>
                </LeftColumn>

                <CenterColumn>
                    <ChartContainer variants={itemVariants}>
                        <ChartTitle>
                            <ChartIcon><FaChartLine /></ChartIcon>
                            Top 10 - Pontuação
                        </ChartTitle>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
                                <XAxis 
                                    dataKey="nome" 
                                    stroke="#94a3b8" 
                                    fontSize={10}
                                    angle={-45}
                                    textAnchor="end"
                                    height={40}
                                />
                                <YAxis stroke="#94a3b8" fontSize={10} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="pontos" fill="#facc15" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <ChartContainer variants={itemVariants}>
                            <ChartTitle>
                                <ChartIcon><FaFire /></ChartIcon>
                                Top 8 Artilheiros
                            </ChartTitle>
                            <HorizontalBarContainer>
                                {topArtilheiros.map((player, index) => (
                                    <HorizontalBarItem key={player.id}>
                                        <PlayerNameBar>{player.nome.length > 8 ? player.nome.substring(0, 8) + '..' : player.nome}</PlayerNameBar>
                                        <BarContainer>
                                            <BarFill
                                                initial={{ width: 0 }}
                                                animate={{ width: `${player.percentage}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            >
                                                <BarValue>{player.gols}</BarValue>
                                            </BarFill>
                                        </BarContainer>
                                    </HorizontalBarItem>
                                ))}
                            </HorizontalBarContainer>
                        </ChartContainer>

                        <ChartContainer variants={itemVariants}>
                            <ChartTitle>
                                <ChartIcon><FaHandsHelping /></ChartIcon>
                                Top 8 Armadores
                            </ChartTitle>
                            <HorizontalBarContainer>
                                {topAssistentes.map((player, index) => (
                                    <HorizontalBarItem key={player.id}>
                                        <PlayerNameBar>{player.nome.length > 8 ? player.nome.substring(0, 8) + '..' : player.nome}</PlayerNameBar>
                                        <BarContainer>
                                            <BarFill
                                                initial={{ width: 0 }}
                                                animate={{ width: `${player.percentage}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            >
                                                <BarValue>{player.assistencias || 0}</BarValue>
                                            </BarFill>
                                        </BarContainer>
                                    </HorizontalBarItem>
                                ))}
                            </HorizontalBarContainer>
                        </ChartContainer>
                    </div>
                </CenterColumn>

                <RightColumn>
                    <InfoRow variants={itemVariants}>
                        <KpiCard whileHover={{ scale: 1.03 }}>
                            <KpiHeader>
                                <KpiIcon><FaFutbol /></KpiIcon>
                                <KpiTitle>Total Gols</KpiTitle>
                            </KpiHeader>
                            <KpiValue>{ligaInfo.totalGols}</KpiValue>
                        </KpiCard>
                        
                        <KpiCard whileHover={{ scale: 1.03 }}>
                            <KpiHeader>
                                <KpiIcon><FaGamepad /></KpiIcon>
                                <KpiTitle>Total Jogos</KpiTitle>
                            </KpiHeader>
                            <KpiValue>{ligaInfo.totalJogos}</KpiValue>
                        </KpiCard>
                        
                        <KpiCard whileHover={{ scale: 1.03 }}>
                            <KpiHeader>
                                <KpiIcon><FaHandsHelping /></KpiIcon>
                                <KpiTitle>Assistências</KpiTitle>
                            </KpiHeader>
                            <KpiValue>{ligaInfo.totalAssistencias}</KpiValue>
                        </KpiCard>
                        
                        <KpiCard whileHover={{ scale: 1.03 }}>
                            <KpiHeader>
                                <KpiIcon><FaUsers /></KpiIcon>
                                <KpiTitle>Jogadores</KpiTitle>
                            </KpiHeader>
                            <KpiValue>{ligaInfo.totalJogadores}</KpiValue>
                        </KpiCard>
                        
                        <KpiCard whileHover={{ scale: 1.03 }}>
                            <KpiHeader>
                                <KpiIcon><FaClock /></KpiIcon>
                                <KpiTitle>Tempo Bola</KpiTitle>
                            </KpiHeader>
                            <KpiValue>{ligaInfo.tempoBola}h</KpiValue>
                        </KpiCard>
                        
                        <KpiCard whileHover={{ scale: 1.03 }}>
                            <KpiHeader>
                                <KpiIcon><FaTrophy /></KpiIcon>
                                <KpiTitle>Gols/Min</KpiTitle>
                            </KpiHeader>
                            <KpiValue>{ligaInfo.mediaGolsPorMinuto}</KpiValue>
                        </KpiCard>
                    </InfoRow>

                    <ChartContainer variants={itemVariants}>
                        <ChartTitle>
                            <ChartIcon><FaTrophy /></ChartIcon>
                            Distribuição de Pontos
                        </ChartTitle>
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={60}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={450}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </RightColumn>
            </MainGrid>
            <BackButton />
        </PageContainer>
    );
};

export default EstatisticasPage;