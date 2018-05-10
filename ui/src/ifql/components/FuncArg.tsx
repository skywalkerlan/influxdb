import React, {PureComponent} from 'react'

import FuncArgInput from 'src/ifql/components/FuncArgInput'
import FuncArgBool from 'src/ifql/components/FuncArgBool'
import {ErrorHandling} from 'src/shared/decorators/errors'
import From from 'src/ifql/components/From'
import Filter from 'src/ifql/components/Filter'
import FilterBuilder from 'src/ifql/components/FilterBuilder'

import {funcNames, argTypes} from 'src/ifql/constants'
import {OnChangeArg} from 'src/types/ifql'

interface Props {
  funcName: string
  funcID: string
  argKey: string
  value: string | boolean
  type: string
  bodyID: string
  declarationID: string
  onChangeArg: OnChangeArg
  onGenerateScript: () => void
}

@ErrorHandling
class FuncArg extends PureComponent<Props> {
  public render() {
    const {
      argKey,
      value,
      type,
      bodyID,
      funcID,
      funcName,
      onChangeArg,
      declarationID,
      onGenerateScript,
    } = this.props

    if (funcName === funcNames.FROM) {
      return (
        <From
          argKey={argKey}
          funcID={funcID}
          value={this.value}
          bodyID={bodyID}
          declarationID={declarationID}
          onChangeArg={onChangeArg}
        />
      )
    }

    if (funcName === funcNames.FILTER) {
      return <Filter value={this.value} render={this.filter} />
    }

    switch (type) {
      case argTypes.STRING:
      case argTypes.DURATION:
      case argTypes.TIME:
      case argTypes.REGEXP:
      case argTypes.FLOAT:
      case argTypes.INT:
      case argTypes.UINT:
      case argTypes.ARRAY: {
        return (
          <FuncArgInput
            type={type}
            value={this.value}
            argKey={argKey}
            funcID={funcID}
            bodyID={bodyID}
            onChangeArg={onChangeArg}
            declarationID={declarationID}
            onGenerateScript={onGenerateScript}
          />
        )
      }

      case argTypes.BOOL: {
        return (
          <FuncArgBool
            value={this.boolValue}
            argKey={argKey}
            bodyID={bodyID}
            funcID={funcID}
            onChangeArg={onChangeArg}
            declarationID={declarationID}
            onGenerateScript={onGenerateScript}
          />
        )
      }
      case argTypes.FUNCTION: {
        // TODO: make separate function component
        return (
          <div className="func-arg">
            <label className="func-arg--label">{argKey}</label>
            <div className="func-arg--value">{value}</div>
          </div>
        )
      }
      case argTypes.NIL: {
        // TODO: handle nil type
        return (
          <div className="func-arg">
            <label className="func-arg--label">{argKey}</label>
            <div className="func-arg--value">{value}</div>
          </div>
        )
      }
      default: {
        return (
          <div className="func-arg">
            <label className="func-arg--label">{argKey}</label>
            <div className="func-arg--value">{value}</div>
          </div>
        )
      }
    }
  }

  private filter = nodes => {
    return <FilterBuilder nodes={nodes} />
  }

  private get value(): string {
    return this.props.value.toString()
  }

  private get boolValue(): boolean {
    return this.props.value === true
  }
}

export default FuncArg
