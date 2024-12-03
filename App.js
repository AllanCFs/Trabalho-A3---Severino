import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLB/search?q=${query}`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar na API do Mercado Livre:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Busca de preço
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Digite o que deseja buscar"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      <div style={{ marginTop: "30px" }}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
        {!loading && results.length > 0 && (
          <Grid container spacing={3}>
            {results.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="140"
                    image={item.thumbnail.replace("-I", "-O")}
                    style={{ objectFit: "contain", maxHeight: "200px" }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      R$ {item.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={item.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver no Mercado Livre
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {!loading && results.length === 0 && query && (
          <Typography variant="body1" align="center" color="text.secondary">
            Nenhum resultado encontrado.
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default App;
