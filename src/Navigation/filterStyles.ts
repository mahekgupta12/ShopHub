import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "75%",
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 25,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: "#1F2937",
  },
});
