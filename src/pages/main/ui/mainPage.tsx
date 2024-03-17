import {
  PanelHeader,
  SplitCol,
  SplitLayout,
  SubnavigationBar,
  SubnavigationButton,
  View,
  usePlatform,
} from '@vkontakte/vkui';
import { useState } from 'react';
import { panels } from '../model/panels';

import { FormFact } from '@/widgets/formFact';
import { FormName } from '@/widgets/formName';

export const MainPage: React.FC = () => {
  const platform = usePlatform();
  const isVKCOM = platform === 'vkcom';
  const [activePanel, setActivePanel] = useState(panels[0]);

  return (
    <SplitLayout header={!isVKCOM && <PanelHeader delimiter="none" />}>
      <SplitCol autoSpaced>
        <View activePanel={activePanel.id} style={{ height: 'initial' }}>
          <FormFact id={panels[0].id} />
          <FormName id={panels[1].id} />
        </View>
        <SubnavigationBar>
          {panels.map((panel) => (
            <SubnavigationButton
              key={panel.id}
              hovered={panel.id === activePanel.id}
              onClick={() => setActivePanel(panel)}
            >
              {panel.textContent}
            </SubnavigationButton>
          ))}
        </SubnavigationBar>
      </SplitCol>
    </SplitLayout>
  );
};
