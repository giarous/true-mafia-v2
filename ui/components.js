import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { colors } from "./theme";

export function Screen({ children, centered = false }) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, centered && styles.centered]}
        >
          <View style={styles.brand}>
            <View style={styles.brandMark} />
            <Text style={styles.brandText}>TRUE MAFIA</Text>
            <Text style={styles.brandCaption}>THE TOWN NEVER TRUSTS.</Text>
          </View>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Heading({ eyebrow, title, subtitle }) {
  return (
    <View style={styles.heading}>
      {!!eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export function Action({ children, onPress, secondary = false }) {
  return (
    <TouchableHighlight
      accessibilityRole="button"
      onPress={onPress}
      underlayColor={secondary ? colors.elevated : colors.redPressed}
      style={[styles.action, secondary && styles.secondary]}
    >
      <View style={styles.actionContent}>
        <Text style={styles.actionText}>{children}</Text>
        <Text accessible={false} style={styles.arrow}>
          →
        </Text>
      </View>
    </TouchableHighlight>
  );
}

export function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export function Phase({ eyebrow, title, subtitle, children, symbol = "☾" }) {
  return (
    <Screen centered>
      <View style={styles.phaseIcon}>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      {children}
    </Screen>
  );
}

export function RoleCard({ eyebrow, name, role, image, children }) {
  return (
    <Screen>
      <Heading
        eyebrow={eyebrow}
        title={name}
        subtitle="For your eyes only. Keep your identity secret."
      />
      <Card>
        <Image source={image} style={styles.roleImage} resizeMode="contain" />
        <Text style={styles.eyebrow}>IDENTITY</Text>
        <Text style={styles.roleName}>{role}</Text>
      </Card>
      {children}
      <Text style={styles.footnote}>Confirm before passing the phone.</Text>
    </Screen>
  );
}

// Keep the original seating order while sharing selection presentation.
const seats = [[1, 10], [2, 9], [3, 8], [4, 7], [5, 6]];
export function PlayerPicker({ players, selected, onSelect }) {
  return (
    <View style={styles.seats}>
      {seats.map((row, index) => (
        <View key={index} style={styles.seatRow}>
          {row.map(number => {
            const active = selected === number;
            return (
              <TouchableHighlight
                key={number}
                accessibilityRole="button"
                accessibilityLabel={`Player ${number}, ${
                  players[number - 1].name
                }`}
                accessibilityState={{ selected: active }}
                underlayColor={colors.redSoft}
                onPress={() => onSelect(number)}
                style={[styles.seat, active && styles.selectedSeat]}
              >
                <View>
                  <View style={styles.seatTop}>
                    <Text
                      style={[
                        styles.seatNumber,
                        active && styles.selectedNumber
                      ]}
                    >
                      {String(number).padStart(2, "0")}
                    </Text>
                    {active && <Text style={styles.check}>✓</Text>}
                  </View>
                  <Text numberOfLines={2} style={styles.seatName}>
                    {players[number - 1].name}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 32,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center"
  },
  centered: { justifyContent: "center" },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
    flexWrap: "wrap"
  },
  brandMark: {
    width: 8,
    height: 18,
    backgroundColor: colors.red,
    borderRadius: 2,
    marginRight: 9
  },
  brandText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2
  },
  brandCaption: {
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 1,
    marginLeft: 12,
    marginVertical: 6
  },
  heading: { marginBottom: 24 },
  eyebrow: {
    color: "#FF687B",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 10
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    letterSpacing: -0.8
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 24
  },
  action: {
    backgroundColor: colors.red,
    borderRadius: 14,
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  actionText: { color: colors.text, fontSize: 15, fontWeight: "700", flex: 1 },
  arrow: { color: colors.text, fontSize: 21, marginLeft: 12 },
  phaseIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.redSoft,
    borderColor: "#602330",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28
  },
  symbol: { fontSize: 40, color: "#FF687B" },
  roleImage: { width: "100%", height: 220, marginBottom: 24, borderRadius: 12 },
  roleName: { color: colors.text, fontSize: 30, fontWeight: "800" },
  footnote: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8
  },
  seats: { marginBottom: 20 },
  seatRow: { flexDirection: "row", marginHorizontal: -5 },
  seat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    margin: 5,
    minHeight: 88
  },
  selectedSeat: { backgroundColor: colors.redSoft, borderColor: colors.red },
  seatTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  seatNumber: { color: colors.muted, fontSize: 23, fontWeight: "800" },
  selectedNumber: { color: colors.text },
  check: { color: "#FF687B", fontWeight: "800", fontSize: 18 },
  seatName: { color: colors.text, fontSize: 13, lineHeight: 18, marginTop: 6 }
});
