import { Center, Group, Paper, RingProgress, Text } from "@mantine/core";
import { useQuery } from "react-query"
import { getCapteurData } from "../services/dht11"
import { SiMoleculer } from "react-icons/si"

function CapteurPhData({capteur}) {
    const key = ['getData',capteur._id]
    const {data} = useQuery(key, () => getCapteurData(capteur._id))
    const PhTemplate = (c) => (
     <>
        <Paper withBorder radius="md" p="xs" className="w-1/4">
        <Group>
          <RingProgress
            size={100}
            roundCaps
            thickness={8}
            sections={[{ value: 40, color: 'blue' }]}
            label={
              <Center>
                <SiMoleculer className="w-10 h-10 text-blue-500" />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              Données PH du capteur
            </Text>
            <Text weight={700} size="xl">
              {Math.ceil(c.valeur)}
            </Text>
          </div>
        </Group>
      </Paper>
     </>
    );


  return (
    <>
    <div className="my-20 mx-10">
       <h1 className="text-3xl font-bold uppercase">{capteur?.nom} PH</h1>
        {data && PhTemplate(data[data.length - 1])}
    </div>
        </>
  )
}

export default CapteurPhData