import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f4f5ff", padding: 20 },

  headerContainer: {
    alignItems: "center",
    marginTop: 50
  },

  logo: {
    backgroundColor: "#4169E1",
    padding: 18,
    borderRadius: 20,
    marginBottom: 10
  },

  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a"
  },

  tagline: {
    fontSize: 14,
    color: "#6c6c6c",
    marginTop: 4
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#e7ebf4",
    padding: 5,
    borderRadius: 12,
    marginTop: 25,
    alignSelf: "center"
  },

  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10
  },

  activeTab: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },

  tabText: {
    fontSize: 15,
    color: "#555"
  },

  activeTabText: {
    color: "#1a1a1a",
    fontWeight: "600"
  },

  formBox: {
    marginTop: 30,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    elevation: 2
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a"
  },

  subtitle: {
    fontSize: 14,
    color: "#7b7b7b",
    marginTop: 5,
    marginBottom: 20
  },

  input: {
    backgroundColor: "#f2f4f6",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8
  },

  submitBtn: {
    backgroundColor: "#4169E1",
    padding: 14,
    borderRadius: 10,
    marginTop: 15
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600"
  }
});
