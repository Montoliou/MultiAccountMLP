Anleihen sind schuldrechtliche Versprechen (Fremdkapital), deren Marktwert invers zum Zinsniveau schwankt. Aktien sind Eigentumsrechte (Eigenkapital), die aufgrund ihrer Nachrangigkeit und der ökonomischen Hebelwirkung (Leverage) langfristig eine höhere Rendite erzielen müssen als die Zinskosten des Unternehmens.

Kernkonzepte für die Implementierung
1. Die Anleihen-Mechanik (Fixed Income)
Eine Anleihe ist ein Kredit an einen Emittenten.

Par-Value (100%): Der Betrag, der am Laufzeitende garantiert zurückgezahlt wird.

Zins-Sensitivität (Duration): Der Kurs einer bestehenden Anleihe sinkt, wenn die Marktzinsen steigen, da neue Anleihen attraktiver werden. Zum Ende der Laufzeit nähert sich der Kurs immer wieder den 100% an (Pull-to-Par).

2. Die Aktien-Anleihen-Relation (Equity Risk Premium)
Die Outperformance von Aktien ist kein Zufall, sondern eine ökonomische Notwendigkeit:

Kapitalkosten-Logik: Ein Unternehmen nimmt Fremdkapital (Anleihen) auf, um Projekte zu finanzieren. Damit das Unternehmen überlebt, muss die Rendite auf dieses Kapital höher sein als der Darlehenszins. Dieser Überschuss (Marge) gehört den Aktionären.

Insolvenz-Hierarchie: Anleihegläubiger werden im Liquidationsfall vorrangig bedient. Aktionäre tragen das volle Restrisiko und verlangen dafür eine Risikoprämie.

Systemstabilität: Würden Anleihen langfristig mehr Rendite abwerfen als die Realwirtschaft (Aktien), würde Fremdkapitalbedienung die Substanz der Unternehmen auffressen, was zu massenhaften Insolvenzen führen würde.

Logik-Bausteine für das Modul
Bond-Rechner: Berechne den Barwert (Present Value) basierend auf Kupon, Restlaufzeit und aktuellem Marktzins.

Wippen-Visualisierung: Implementiere eine mechanische Analogie: Linke Seite = Marktzins (Up), Rechte Seite = Kurs der Bestandsanleihe (Down).

Wachstums-Spread: Visualisiere die Differenz zwischen "Cost of Debt" (Anleihezins) und "Return on Equity" (Aktienrendite).

[MEINUNG]: In der Simulation sollte verdeutlicht werden, dass eine Anleihe nur dann "sicher" ist, wenn der Emittent zahlungsfähig bleibt und man die Laufzeit aussitzt. Die Schwankungen dazwischen sind lediglich Opportunitätskosten des Marktes.