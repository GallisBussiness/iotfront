import { useState } from "react";
import { useQuery } from "react-query"
import { getCapteurData } from "../services/dht11"
import { Chart } from 'primereact/chart';

function CapteurDht11Data({capteur}) {
  const [basicData,setBasicData] = useState({});
  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .6,
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

    const key = ['getData',capteur._id]
    const {data} = useQuery(key, () => getCapteurData(capteur._id), {
      onSuccess:(_) => {
       const temp = _.map(d => Math.round(d.temperature)).reverse();
       const labels = _.map(d => d.capteur.nom);
       const tempObj  = {
                label: 'Température en °C',
                data: temp,
                fill: true,
                borderColor: '#42A5F5',
                tension: .4
            }

            const hum = _.map(d => Math.round(d.humidite)).reverse();
            const humObj  = {
                     label: 'Humidité en %',
                     data: hum,
                     fill: '#FFA726',
                     borderColor: '#FFA726',
                     tension: .4
                 }
        const datasets = [
        tempObj,
        humObj
      ]


        setBasicData({
          labels,
          datasets
      })
      }
    });
    const DHT11Template = (c) => (
     <div className="w-4/5 mx-auto">
        <Chart type="line" data={basicData} options={basicOptions} />
     </div>
     
    );

  return (
    <>
    <div className="my-20 mx-10">
       <h1 className="text-3xl font-bold uppercase">Données DHT11 / {capteur?.nom}</h1>
        {data && DHT11Template(data[data.length - 1])}
    </div>
    </>
  )
}

export default CapteurDht11Data