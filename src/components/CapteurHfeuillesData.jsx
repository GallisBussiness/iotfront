import { Center, Group, Paper, RingProgress, Text } from "@mantine/core";
import { useQuery } from "react-query"
import { getCapteurData } from "../services/dht11"
import { GiThreeLeaves } from "react-icons/gi"

function CapteurHfeuillesData({capteur}) {
    const key = ['getData',capteur._id]
    const {data} = useQuery(key, () => getCapteurData(capteur._id))
    const PhTemplate = (c) => (
     <>
        <Paper withBorder radius="md" p="xs" className="w-full">
        <Group>
          <RingProgress
            size={100}
            roundCaps
            thickness={8}
            sections={[{ value:(c.valeur * 100) / 10, color: 'green' }]}
            label={
              <Center>
                <GiThreeLeaves className="w-10 h-10 text-green-500" />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              Données Humidité du feuilles du capteur
            </Text>
            <Text weight={700} size="xl">
              {Math.round(c?.valeur)}
            </Text>
          </div>
        </Group>
      </Paper>
     </>
    );
  return (
    <>
     <div className="my-20 mx-10">
       <h1 className="text-3xl font-bold uppercase">{capteur?.nom} Humidité des feuilles</h1>
        {data && PhTemplate(data[data.length - 1])}
    </div>
    </>
  )
}

export default CapteurHfeuillesData