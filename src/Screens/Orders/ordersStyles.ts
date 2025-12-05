import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginTop: 42,
    marginBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },

  orderCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderIdText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F2937",
  },

  statusBadge: {
    backgroundColor: "#E6EEFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  statusText: {
    color: "#3B5BFE",
    fontWeight: "700",
  },

  orderDate: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 10,
  },

  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  productImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 12,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  qtyText: {
    color: "#6B7280",
    marginTop: 2,
  },

  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: "800",
    color: "#3B5BFE",
  },
});

export default styles;
