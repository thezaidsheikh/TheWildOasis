import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import styled from 'styled-components'
import { box } from '../../styles/styles'
import Heading from '../../ui/Heading'

const ChartBox = styled.div`
  ${box}
  padding: 2.4rem 3.2rem;
  margin-bottom: 1rem; /* Corrected typo */

  grid-column: 3 / span 2;
  border-radius: 8px; /* Added border radius for a softer look */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Added shadow for depth */

  & .recharts-pie-label-text {
    font-weight: 600;
    font-size: 14px; /* Increased font size for better readability */
    fill: #333; /* Changed color for better contrast */
  }

  & > *:first-child {
    margin-bottom: 1.6rem;
  }
`

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
]

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#c2410c',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#a16207',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#4d7c0f',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#15803d',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#1d4ed8',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
]

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj))
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights
      if (num === 1) return incArrayValue(arr, '1 night')
      if (num === 2) return incArrayValue(arr, '2 nights')
      if (num === 3) return incArrayValue(arr, '3 nights')
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights')
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights')
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights')
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights')
      if (num >= 21) return incArrayValue(arr, '21+ nights')
      return arr
    }, startData)
    .filter((obj) => obj.value > 0)

  return data
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = { isDarkMode: false }
  const startData = isDarkMode ? startDataDark : startDataLight
  const data = prepareData(startData, confirmedStays)

  return (
    <ChartBox>
      <Heading type="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} nameKey="duration" dataKey="value" cx="30%" cy="35%" innerRadius={70} outerRadius={90} fill="#4f46e5" paddingAngle={5} startAngle={90} endAngle={-270}>
            {data.map((entry) => (
              <Cell key={entry.duration} fill={entry.color} stroke={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="left" align="right" width="30%" layout="vertical" iconSize={15} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  )
}

export default DurationChart
