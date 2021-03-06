import React, { useContext } from "react";
import { Row, Col } from "antd";
import DetailedPage from "../../style/DetailedPage";
import RecipeLabels from "./RecipeLabels";
import NutritionalValues from "./nutritionDisplay/NutritionalValues";
import RecipeInfo from "./RecipeInfo";
import { SelectedRecipeContext } from "../../context/SelectedRecipeContext";
import CommentSection from "../comments/CommentSection";
import { CommentProvider } from "../../context/CommentContext";
import PersonalNoteSection from "../personalNote/PersonalNoteSection";
import { PersonalNoteProvider } from "../../context/PersonalNoteContext";

import styled from "styled-components";

const DetailedRecipe = styled.div`
  & #recipe-details {
    padding: 0 0 20px;
  }

  & *.main-row {
    padding: 20px 0 20px 0;
    border-bottom: 1px dotted ${(props) => props.theme.secondaryColor};
  }

  & *.main-row:last-child {
    border: none;
    padding-bottom: 0;
  }

  & *#recipe-labels {
    text-align: center;
  }

  & *#recipe-labels * p {
    margin: 3px;
  }

  & *#comments,
  *#notes {
    text-align: center;
  }
`;

const RecipeDetails = (props) => {
  const { selectedRecipe } = useContext(SelectedRecipeContext);

  let content = null;

  if (selectedRecipe != null) {
    content = (
      <DetailedPage>
        <DetailedRecipe>
          <Row justify="center">
            <Col id="container" span={16}>
              <Row className="main-row" id="recipe-details">
                <RecipeInfo></RecipeInfo>
              </Row>
              <Row className="main-row" id="recipe-labels">
                <RecipeLabels></RecipeLabels>
              </Row>
              <Row
                className="main-row"
                justify="center"
                id="nutritional values"
              >
                <NutritionalValues></NutritionalValues>
              </Row>
              <Row className="main-row" justify="center" id="notes">
                <Col>
                  <PersonalNoteProvider>
                    <PersonalNoteSection />
                  </PersonalNoteProvider>
                </Col>
              </Row>
              <Row className="main-row" justify="center" id="comments">
                <Col>
                  <CommentProvider>
                    <CommentSection />
                  </CommentProvider>
                </Col>
              </Row>
            </Col>
          </Row>
        </DetailedRecipe>
      </DetailedPage>
    );
  }
  return content;
};

export default RecipeDetails;
