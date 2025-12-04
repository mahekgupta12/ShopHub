import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "700", 
    marginBottom: 16 
  },

  orderBox: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  key: {
    fontSize: 14,
    color: "#4B5563",
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  total: {
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "700",
  },
});

export default styles;
