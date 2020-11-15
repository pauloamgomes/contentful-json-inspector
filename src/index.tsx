import * as React from 'react';
import { render } from 'react-dom';
import { Button, TextLink, Spinner } from '@contentful/forma-36-react-components';
import {
  init,
  locations,
  DialogExtensionSDK,
  SidebarExtensionSDK
} from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';
//
import './index.css';

interface DialogExtensionState {
  json?: string;
  originalJson?: string;
  changed: boolean;
  loading: boolean;
}

interface Props {
  sdk: DialogExtensionSDK;
}

export class DialogExtension extends React.Component<Props, DialogExtensionState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      json: '',
      originalJson: '',
      changed: false,
      loading: true
    };
  }

  componentDidMount() {
    const sdk = this.props.sdk;
    sdk.window.startAutoResizer();
    const parameters: Record<string, any> = sdk.parameters;
    const id = parameters.invocation && parameters.invocation.id;
    if (id) {
      sdk.space.getEntry(id).then((result: object) => {
        const json = JSON.stringify(result, undefined, 4);
        this.setState({ json, originalJson: json, loading: false });
      });
    }
  }

  updateEntry = () => {
    const { sdk } = this.props;
    const json = this.state.json || '';
    try {
      const parsed = JSON.parse(json);
      sdk.space
        .updateEntry({ ...parsed })
        .then(() => {
          sdk.notifier.success('Entry updated');
          this.props.sdk.close('modal dialog');
        })
        .catch(() => {
          sdk.notifier.error('Invalid JSON structure');
        });
    } catch (e) {
      sdk.notifier.error('Invalid JSON');
    }
  };

  onChange = (json: string) => {
    try {
      JSON.parse(json);
      const originalJson = this.state.originalJson;
      const changed = json !== originalJson;
      this.setState({ json, changed });
    } catch (e) {
      this.setState({ json, changed: false });
    }
  };

  render() {
    const { json, changed, loading } = this.state;

    return (
      <div style={{ margin: tokens.spacingM }}>
        {loading && (
          <div>
            Loading <Spinner size="small" />
          </div>
        )}
        {!loading && (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <AceEditor
                mode="json"
                theme="github"
                onChange={this.onChange}
                name="brace-editor"
                value={json}
                editorProps={{ $blockScrolling: true }}
                width="100%"
                height="88vh"
                debounceChangePeriod={200}
              />
            </div>
            <div style={{ paddingTop: '10px' }}>
              <Button
                style={{ marginRight: '10px' }}
                testId="close-dialog"
                buttonType="muted"
                onClick={() => {
                  this.props.sdk.close('modal dialog');
                }}>
                Close
              </Button>
              <Button
                testId="update-dialog"
                buttonType="positive"
                disabled={!changed}
                onClick={() => {
                  this.updateEntry();
                }}>
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export class SidebarExtension extends React.Component<{
  sdk: SidebarExtensionSDK;
}> {
  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  onButtonClick = async () => {
    await this.props.sdk.dialogs.openExtension({
      width: 'fullWidth',
      allowHeightOverflow: true,
      position: 'center',
      title: 'Entry JSON Inspector',
      parameters: {
        id: this.props.sdk.ids.entry
      }
    });
  };

  render() {
    return (
      <TextLink onClick={this.onButtonClick} icon="Entry">
        Inspect Entry JSON object
      </TextLink>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    render(<DialogExtension sdk={sdk as DialogExtensionSDK} />, document.getElementById('root'));
  } else {
    render(<SidebarExtension sdk={sdk as SidebarExtensionSDK} />, document.getElementById('root'));
  }
});
