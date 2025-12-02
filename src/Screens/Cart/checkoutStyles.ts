import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  /* Header (fixed) */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF2F7",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  headerRightSpacer: {
    width: 36,
  },

  /* Scroll content */
  scrollContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  half: {
    flex: 1,
  },
  spacer: {
    width: 12,
  },

  /* Payment method */
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB",
  },
  paymentLabel: {
    fontSize: 15,
    color: "#111827",
  },

  /* Summary */
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  summaryText: {
    fontSize: 15,
    color: "#4B5563",
  },
  summaryPrice: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "800",
    color: "#2563EB",
  },

  /* Footer with sticky button */
  footer: {
    paddingBottom: 16,
    paddingTop: 8,
  },
  placeOrderBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  placeOrderText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;
