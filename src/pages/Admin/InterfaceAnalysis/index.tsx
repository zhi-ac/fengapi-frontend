import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {listTopInvokeInterfaceInfoUsingGet} from "@/services/fengapi-backend/analysisController";


const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);

  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGet().then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
    } catch (e: any) {

    }
  },[])

  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name,
    }
  })

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartData
      }
    ]
  };
  return (
    <PageContainer>
      <ReactECharts option={option}/>
    </PageContainer>
  );

};
export default InterfaceAnalysis;
