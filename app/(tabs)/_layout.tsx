import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (

        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconComponent;
                    if (route.name === "index") {
                        iconComponent = focused ? (
                            <Ionicons name="home" size={22} color="#595a5aff" />
                        ) : (
                            <Ionicons name="home-outline" size={22} color="#B0B0B0" />
                        );
                    } else if (route.name === "Properties") {
                        iconComponent = focused ? (
                            <Ionicons name="filter" size={22} color="#595a5aff" />
                        ) : (
                            <Ionicons name="filter-outline" size={22} color="#B0B0B0" />
                        );
                    } else if (route.name === "Payment") {
                        iconComponent = focused ? (
                            <Ionicons name="card" size={22} color="#595a5aff" />
                        ) : (
                            <Ionicons name="card-outline" size={22} color="#B0B0B0" />
                        );
                    } else if (route.name === "Profile") {
                        iconComponent = focused ? (
                            <Ionicons name="person" size={22} color="#595a5aff" />
                        ) : (
                            <Ionicons name="person-outline" size={22} color="#B0B0B0" />
                        );
                    }
                    return iconComponent;
                },
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#FFFFFF',
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 5,
                    borderTopWidth: 1,
                    borderTopColor: "#e0e0e0",
                    elevation: 0,
                },
                tabBarActiveTintColor: '#595a5aff',
                tabBarInactiveTintColor: '#B0B0B0',
                tabBarShowLabel: false,
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Properties"
                options={{
                    title: "Properties",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Payment"
                options={{
                    title: "Payment",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
        </Tabs>

    );
}
