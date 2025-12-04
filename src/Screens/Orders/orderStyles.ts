import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 40,
    textAlign: "center",
    justifyContent: "center",
  },
  orderBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 8,
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
    marginTop: 8,
  },
});

export default styles;
