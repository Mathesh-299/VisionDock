export default function formatDate(iso) {
    try {
        return new Date(iso).toLocaleDateString();
    } catch (e) {
        return "";
    }
}
