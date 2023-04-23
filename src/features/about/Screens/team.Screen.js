import { FlatList, Text, View, Image } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { DeveloperInfoCard } from "../../../components/Cards/developer-card.component";
import { develpers } from "../../../services/about/team.mock";
import { Card } from "react-native-paper";
import styled from "styled-components";

const DeveloperInfoContainer = styled(Card)`
  width: 95%;
  height: 380px;
  margin: 2%;
  padding-top: 30px;
  align-items: center;
  justify-content: start;
`;
export const TeamScreen = () => {
  return (
    <SafeArea>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 30,
            fontStyle: "italic",
            color: "violet",
            textAlign: "center",
          }}
        >
          our team
        </Text>
      </View>
      <FlatList
        data={develpers}
        renderItem={({ item, index }) => {
          return (
            <DeveloperInfoContainer>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 25,
                }}
              >
                <View
                  style={{
                    height: 200,
                    width: 200,
                    maxHeight: 200,
                    maxWidth: 200,
                  }}
                >
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={{
                      height: 200,
                      width: 200,
                      margin: 5,
                      borderRadius: 100,
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  fontSize: 28,
                  textAlign: "center",
                  marginBottom: 18,
                  fontStyle: "italic",
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Text>
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                {item.email}
              </Text>
            </DeveloperInfoContainer>
          );
        }}
        keyExtractor={(item, index) => `${item.name} ${item.email} ${index}`}
      />
    </SafeArea>
  );
};
